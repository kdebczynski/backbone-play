define([
    'backbone',
    'dot',
    'text!templates/components/slider.html'
], function(
    Backbone,
    dot,
    templateSlider
) {
    return Backbone.View.extend({
        
        /**
         * Component class name
         */
        className: 'slider',
        
        /**
         * Slider template
         */
        templateSlider: dot.compile(templateSlider),
        
        /**
         * Initialize slider by given slides config
         * Example config:
         * [
         *      {
         *          showTriggerValue: 6,
         *          component: ex1
         *      },
         *      {
         *          showTriggerValue: 7,
         *          component: ex2
         *      }
         * ]
         * 
         * showTriggerValue - used to show slide by this value
         * component - backbone view object
         * 
         * @param {object} params
         */
        initialize: function(params) {
            var cfg = params || {};
            
            this.slides = cfg.slides || [];
        },
        
        /**
         * Render slides (backbone view objects)
         */
        renderSlides: function() {
            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].component.render();
            }
        },
        
        /**
         * Append rendered slides to DOM
         * Slides are wrapped by slide div
         */
        appendSlides: function() {
            var slideWrapper,
                slide;
            
            for (var i = 0; i < this.slides.length; i++) {
                slideWrapper = '<div class="slide" data-show-trigger="' + this.slides[i].showTriggerValue + '"></div>';
                slide = $(slideWrapper).append(this.slides[i].component.el);
                this.$el.find('.slider-content').append(slide);
            }
        },
        
        /**
         * Show slide by given trigger value
         * @param {type} val
         */
        showSlideByTriggerVal: function(val) {
            var slideToEl = this.$el.find('.slide[data-show-trigger="' + val + '"]'),
                activeSlide = this.$el.find('.slide.active');
        
            activeSlide.removeClass('active');
            slideToEl.addClass('active');
        
            activeSlide.fadeOut();
            slideToEl.fadeIn();
        },
        
        /**
         * Render slider template and add elements to DOM
         */
        render: function() {
            var html = '';
            
            html = this.templateSlider();
            
            this.$el.html(html);
            this.renderSlides();
            this.appendSlides();
        }
        
    });
});