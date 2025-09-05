/**
 * API Client for Health Quiz Web Application
 * Provides easy-to-use functions for interacting with the server API
 */

class HealthQuizAPI {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    /**
     * Generic fetch wrapper with error handling
     */
    async _fetch(url, options = {}) {
        try {
            const config = {
                headers: { ...this.defaultHeaders, ...options.headers },
                ...options
            };

            const response = await fetch(`${this.baseURL}${url}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * Health Check - Verify server status
     */
    async healthCheck() {
        return await this._fetch('/api/health');
    }

    /**
     * Quiz API Methods
     */
    quiz = {
        /**
         * Get all quiz questions (without correct answers)
         */
        getQuestions: async () => {
            return await this._fetch('/api/quiz/questions');
        },

        /**
         * Submit quiz answers and get results
         * @param {Array} answers - Array of {questionId, selectedOption}
         * @param {Object} userInfo - Optional user information
         */
        submit: async (answers, userInfo = {}) => {
            return await this._fetch('/api/quiz/submit', {
                method: 'POST',
                body: JSON.stringify({ answers, userInfo })
            });
        },

        /**
         * Get quiz statistics
         */
        getStats: async () => {
            return await this._fetch('/api/quiz/stats');
        }
    };

    /**
     * Health API Methods
     */
    health = {
        /**
         * Get health tips by category
         */
        getTips: async () => {
            return await this._fetch('/api/health/tips');
        },

        /**
         * Calculate BMI
         * @param {number} weight - Weight in kg
         * @param {number} height - Height in cm
         */
        calculateBMI: async (weight, height) => {
            return await this._fetch('/api/health/bmi', {
                method: 'POST',
                body: JSON.stringify({ weight, height })
            });
        }
    };
}

// Create global instance
const api = new HealthQuizAPI();

/**
 * Quiz Management Class
 * Handles quiz functionality with local state management
 */
class QuizManager {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = null;
        this.endTime = null;
        this.results = null;
    }

    /**
     * Initialize quiz by loading questions
     */
    async init() {
        try {
            const response = await api.quiz.getQuestions();
            this.questions = response.data;
            this.currentQuestionIndex = 0;
            this.answers = [];
            this.startTime = new Date();
            return true;
        } catch (error) {
            console.error('Failed to initialize quiz:', error);
            return false;
        }
    }

    /**
     * Get current question
     */
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    /**
     * Answer current question and move to next
     */
    answerQuestion(selectedOption) {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return false;

        // Update or add answer
        const existingAnswerIndex = this.answers.findIndex(
            a => a.questionId === currentQuestion.id
        );

        if (existingAnswerIndex >= 0) {
            this.answers[existingAnswerIndex].selectedOption = selectedOption;
        } else {
            this.answers.push({
                questionId: currentQuestion.id,
                selectedOption: selectedOption
            });
        }

        return true;
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    /**
     * Move to previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }

    /**
     * Jump to specific question
     */
    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
            return true;
        }
        return false;
    }

    /**
     * Check if all questions are answered
     */
    isComplete() {
        return this.answers.length === this.questions.length;
    }

    /**
     * Get progress percentage
     */
    getProgress() {
        return Math.round((this.answers.length / this.questions.length) * 100);
    }

    /**
     * Submit quiz and get results
     */
    async submit(userInfo = {}) {
        try {
            this.endTime = new Date();
            const timeTaken = this.endTime - this.startTime;

            const response = await api.quiz.submit(this.answers, {
                ...userInfo,
                timeTaken: Math.round(timeTaken / 1000) // in seconds
            });

            this.results = response.data;
            return this.results;
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            throw error;
        }
    }

    /**
     * Reset quiz to initial state
     */
    reset() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = null;
        this.endTime = null;
        this.results = null;
    }
}

/**
 * BMI Calculator Class
 */
class BMICalculator {
    /**
     * Calculate BMI using server API
     */
    static async calculate(weight, height) {
        try {
            const response = await api.health.calculateBMI(weight, height);
            return response.data;
        } catch (error) {
            console.error('BMI calculation failed:', error);
            throw error;
        }
    }

    /**
     * Client-side BMI calculation (backup)
     */
    static calculateLocal(weight, height) {
        if (!weight || !height || weight <= 0 || height <= 0) {
            throw new Error('Invalid weight or height values');
        }

        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBMI = Math.round(bmi * 100) / 100;

        let category = '';
        let recommendation = '';

        if (roundedBMI < 18.5) {
            category = 'Kekurangan berat badan';
            recommendation = 'Konsultasi dengan ahli gizi untuk menambah berat badan dengan sehat';
        } else if (roundedBMI < 25) {
            category = 'Berat badan normal';
            recommendation = 'Pertahankan berat badan dengan pola makan sehat dan olahraga teratur';
        } else if (roundedBMI < 30) {
            category = 'Kelebihan berat badan';
            recommendation = 'Kurangi berat badan dengan diet seimbang dan olahraga rutin';
        } else {
            category = 'Obesitas';
            recommendation = 'Segera konsultasi dengan dokter untuk program penurunan berat badan';
        }

        return {
            bmi: roundedBMI,
            category,
            recommendation,
            weight,
            height
        };
    }
}

/**
 * Health Tips Manager
 */
class HealthTipsManager {
    constructor() {
        this.tips = [];
        this.currentTipIndex = 0;
    }

    /**
     * Load health tips from server
     */
    async loadTips() {
        try {
            const response = await api.health.getTips();
            this.tips = response.data;
            return this.tips;
        } catch (error) {
            console.error('Failed to load health tips:', error);
            return [];
        }
    }

    /**
     * Get tips by category
     */
    getTipsByCategory(category) {
        return this.tips.find(tip => tip.category === category);
    }

    /**
     * Get random tip
     */
    getRandomTip() {
        if (this.tips.length === 0) return null;

        const allTips = this.tips.flatMap(category =>
            category.tips.map(tip => ({
                category: category.category,
                tip: tip
            }))
        );

        if (allTips.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * allTips.length);
        return allTips[randomIndex];
    }

    /**
     * Get daily tip (rotates based on day of year)
     */
    getDailyTip() {
        if (this.tips.length === 0) return null;

        const allTips = this.tips.flatMap(category =>
            category.tips.map(tip => ({
                category: category.category,
                tip: tip
            }))
        );

        if (allTips.length === 0) return null;

        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const tipIndex = dayOfYear % allTips.length;

        return allTips[tipIndex];
    }
}

/**
 * Statistics Manager
 */
class StatsManager {
    /**
     * Get quiz statistics
     */
    static async getQuizStats() {
        try {
            const response = await api.quiz.getStats();
            return response.data;
        } catch (error) {
            console.error('Failed to get quiz stats:', error);
            return null;
        }
    }

    /**
     * Format statistics for display
     */
    static formatStats(stats) {
        if (!stats) return null;

        return {
            totalAttempts: stats.totalAttempts || 0,
            averageScore: `${stats.averageScore || 0}%`,
            highestScore: `${stats.highestScore || 0}%`,
            lowestScore: `${stats.lowestScore || 0}%`,
            recentResults: stats.recentResults || []
        };
    }
}

/**
 * Notification System
 */
class NotificationManager {
    /**
     * Show success notification
     */
    static showSuccess(message, duration = 3000) {
        this._showNotification(message, 'success', duration);
    }

    /**
     * Show error notification
     */
    static showError(message, duration = 5000) {
        this._showNotification(message, 'error', duration);
    }

    /**
     * Show info notification
     */
    static showInfo(message, duration = 3000) {
        this._showNotification(message, 'info', duration);
    }

    /**
     * Internal method to show notifications
     */
    static _showNotification(message, type, duration) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after duration
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
}

/**
 * Local Storage Helper
 */
class StorageHelper {
    /**
     * Save data to localStorage
     */
    static save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    /**
     * Load data from localStorage
     */
    static load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return defaultValue;
        }
    }

    /**
     * Remove data from localStorage
     */
    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
            return false;
        }
    }

    /**
     * Clear all localStorage
     */
    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }
}

// Export for use in other files
window.HealthQuizAPI = HealthQuizAPI;
window.QuizManager = QuizManager;
window.BMICalculator = BMICalculator;
window.HealthTipsManager = HealthTipsManager;
window.StatsManager = StatsManager;
window.NotificationManager = NotificationManager;
window.StorageHelper = StorageHelper;
window.api = api;

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Health Quiz API Client loaded successfully!');

    // Test server connection
    api.healthCheck().then(response => {
        console.log('Server connection successful:', response.message);
        NotificationManager.showSuccess('Terhubung ke server!');
    }).catch(error => {
        console.warn('Server connection failed:', error.message);
        NotificationManager.showError('Tidak dapat terhubung ke server');
    });
});
