define([
    'backbone',
    'dot',
    'text!templates/components/fillInItem.html'
], function(
    Backbone,
    dot,
    templateFillIn
) {
    return Backbone.View.extend({
        /**
         * Component class name
         */
        className: 'fill-in',
        
        /**
         * Saved state of input value
         */
        savedInputValue: '',
        
        /**
         * FillIn template
         */
        templateFillIn: dot.compile(templateFillIn),
        
        /**
         * Initialize component by given config
         * Example config:
         * {
         *      model: new FillInModel({
         *          'id': 1,
         *          'label': '1',
         *          'answer': 'aaa',
         *          'isExample': true
         *      })
         * }
         * 
         * @param {object} params
         */
        initialize: function(params) {
            var cfg = params || {};
            
            this.model = cfg.model || null;
        },
        
        /**
         * Get value from input
         * 
         * @returns {string}
         */
        getInputValue: function() {
            var input = this.$el.find('input');
            
            return input.val();
        },
        
        /**
         * Set value for input
         * 
         * @param {string} value
         */
        setInputValue: function(value) {
            this.$el.find('input').val(value);
        },
        
        /**
         * Set last input value
         */
        setSavedInputValue: function() {
            this.$el.find('input').val(this.savedInputValue);
        },
        
        /**
         * Set OK icon
         */
        setOk: function() {
            this.$el.find('.result').removeClass('wrong');
            this.$el.find('.result').addClass('ok');
        },
        
        /**
         * Set Wrong icon
         */
        setWrong: function() {
            this.$el.find('.result').addClass('wrong');
            this.$el.find('.result').removeClass('ok');
        },
        
        /**
         * Hide result icon
         */
        hideResult: function() {
            this.$el.find('.result').removeClass('wrong');
            this.$el.find('.result').removeClass('ok');
        },
        
        /**
         * Render fillInItem by model
         * 
         * @returns {object}
         */
        render: function() {
            var html = '';
            
            html = this.templateFillIn({
                'id': this.id + '-input',
                'label': this.model.get('label'),
                'isExample': this.model.get('isExample')
            });
            
            this.$el.html(html);
            
            return this;
        }
        
    });
});