define([
    'backbone',
    'dot',
    'text!templates/components/navigation.html'
], function(
    Backbone,
    dot,
    templateNavigation
) {
    return Backbone.View.extend({
        /**
         * Component class name
         */
        className: 'navigation',
        
        /**
         * Navigation template
         */
        templateNavigation: dot.compile(templateNavigation),
        
        /**
         * Handle events
         */
        events: {
            "click .arrows .prev": "prev",
            "click .arrows .next": "next",
            "click ul li > ul li span": "goTo"
        },
        
        /**
         * Limitation defines which setps are allowed to navigate
         */
        navigationLimit: {
            stepMin: null,
            stepMax: null
        },
        
        /**
         * Holds previous step number
         */
        previousStep: null,
        
        /**
         * Definition of navigation sections and steps
         */
        navigationConfig: [[1, 2], [3, 4, 5, 6], [7, 8, 9], [10]],
        
        /**
         * Initialize navigation component 
         * 
         * @param {object} params - navigation configuration
         */
        initialize: function(params) {
            var naviCfg = params || {};
            
            this.navigationConfig = naviCfg.config || this.navigationConfig;
            this.currentStep = naviCfg.activeStep || 1;
            this.navigationLimit = naviCfg.navigationLimit || this.navigationLimit;
            this.currentSection = this.getCurrentSectionByStep();
            this.total = this.countElements();
        },

        /**
         * Counts total elements in navigation
         * 
         * @returns {int}
         */
        countElements: function() {
            var total = 0;
            
            for (var i = 0; i < this.navigationConfig.length; i++) {
                total += this.navigationConfig[i].length;
            }
            
            return total;
        },
        
        /**
         * Returns current section calculated by current step number
         * 
         * @returns {int}
         */
        getCurrentSectionByStep: function() {
            var needBreak = false;
            
            for (var i = 0; i < this.navigationConfig.length; i++) {
                for (var j = 0; j < this.navigationConfig[i].length; j++) {
                    if (this.currentStep === this.navigationConfig[i][j]) {
                        needBreak = true;
                        break;
                    }
                }
                
                if (needBreak) {
                    break;
                }
            }
            
            return i + 1;
        },
        
        /**
         * Click on next arrow
         */
        next: function() {
            if (this.currentStep < this.total) {
                if (this.isAllowedNavigateToStep(this.currentStep + 1)) {
                    this.setupNavigationByStep(this.currentStep + 1);
                }
            }
        },
        
        /**
         * Click on prev arrow
         */
        prev: function() {
            if (this.currentStep > 1) {
                if (this.isAllowedNavigateToStep(this.currentStep - 1)) {
                    this.setupNavigationByStep(this.currentStep - 1);
                }
            }
        },
        
        /**
         * Check if user is allowed navigate to given step
         * 
         * @param {int} step
         * @returns {Boolean}
         */
        isAllowedNavigateToStep: function(step) {
            var allowed = true;
            
            if (this.navigationLimit.stepMin !== null) {
                if (step < this.navigationLimit.stepMin) {
                    allowed = false;
                }
            }
            
            if (this.navigationLimit.stepMax !== null) {
                if (step > this.navigationLimit.stepMax) {
                    allowed = false;
                }
            }
            
            return allowed;
        },
        
        /**
         * Click on navigation item (step)
         * 
         * @param {object} e
         */
        goTo: function(e) {
            var selected = parseInt($(e.currentTarget).attr('data-step'));
            
            if (selected !== this.currentStep && this.isAllowedNavigateToStep(selected)) {
                this.setupNavigationByStep(selected);
            }
        },
        
        /**
         * Setup arrows visibility
         */
        setupArrows: function() {
            var prevArrowEl = this.$el.find('.arrows .prev'),
                nextArrowEl = this.$el.find('.arrows .next');
        
            prevArrowEl.removeClass('hidden');
            nextArrowEl.removeClass('hidden');
            
            if (this.currentStep === 1) {
                prevArrowEl.addClass('hidden');
            }
            if (this.currentStep === this.total) {
                nextArrowEl.addClass('hidden');
            }
        },
        
        /**
         * Setup navigation UI by given step
         * 
         * @param {int} step
         */
        setupNavigationByStep: function(step) {
            this.previousStep = this.currentStep;
            this.currentStep = step;
            this.currentSection = this.getCurrentSectionByStep();
            this.setupActiveDomEl();
            this.setupArrows();
            
            // TODO: slide navigation
        },
        
        /**
         * Activate section and step
         */
        setupActiveDomEl: function() {
            var activeSectionEl = this.$el.find('ul li.section.active'),
                activeStepEl = this.$el.find('ul li ul li.step.active');
        
            if (activeSectionEl) {
                activeSectionEl.removeClass('active');
            }
            
            if (activeStepEl) {
                activeStepEl.removeClass('active');
            }
            
            this.$el.find('ul li.section').eq(this.currentSection - 1).addClass('active');
            this.$el.find('ul li ul li.step').eq(this.currentStep - 1).addClass('active');
            
            this.trigger('navigation:changed');
        },
        
        /**
         * Create navigation UI
         * 
         * @returns {string}
         */
        createNavigation: function() {
            var html = '';
            
            html = this.templateNavigation({
                navigationConfig: this.navigationConfig,
                currentSection: this.currentSection,
                currentStep: this.currentStep,
                total: this.total
            });
            
            return html;
        },
        
        /**
         * Render navigation
         */
        render: function() {
            var html = '';
            
            html = this.createNavigation();
            
            this.$el.html(html);
            this.setupActiveDomEl();
        }
        
    });
});