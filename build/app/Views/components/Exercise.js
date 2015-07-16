define([
    'backbone',
    'dot'
], function(
    Backbone,
    dot
) {
    return Backbone.View.extend({
        
        /**
         * Component class name
         */
        className: 'exercise',
        
        /**
         * Compited dot template
         */
        templateExercise: null,
        
        /**
         * Handle events
         */
        events: {
            "click .checker": "checkUserAnswers"
        },
        
        /**
         * Flag used to check that test is checked now
         */
        isChecked: false,
        
        /**
         * Initialize Exercise by given config
         * Example config:
         * 
         * 
         * @param {object} params
         */
        initialize: function(params) {
            var cfg = params || {},
                template;
            
            template = cfg.templateExercise || '';
            this.templateExercise = dot.compile(template);
            this.elements = cfg.elements || [];
        },
        
        /**
         * Get correct answers from elements model
         * 
         * @return {array}
         */
        getAnswers: function() {
            var answers = [];
            
            for (var i = 0; i < this.elements.length; i++) {
                answers.push(this.elements[i].model.get('answer'));
            }
            
            return this.shuffleArray(answers);
        },
        
        /**
         * Check answers filled by user
         */
        checkUserAnswers: function() {
            var inputValue,
                correctAnswer,
                i;
            
            if (!this.isChecked) {
                for (i = 0; i < this.elements.length; i++) {
                    inputValue = this.elements[i].getInputValue();
                    correctAnswer = this.elements[i].model.get('answer');
                    this.elements[i].savedInputValue = inputValue;
                    
                    if (inputValue.toLowerCase().trim() == correctAnswer.toLowerCase().trim()) {
                        this.elements[i].setOk();
                    } else {
                        this.elements[i].setWrong();
                    }
                    
                    this.elements[i].setInputValue(correctAnswer);
                    this.$el.find('.checker').removeClass('check');
                    this.$el.find('.checker').addClass('refresh');
                    this.isChecked = true;
                }
            } else {
                for (i = 0; i < this.elements.length; i++) {
                    this.elements[i].setSavedInputValue();
                    this.elements[i].hideResult();
                    this.$el.find('.checker').addClass('check');
                    this.$el.find('.checker').removeClass('refresh');
                    this.isChecked = false;
                }
            }
        },
        
        /**
         * Randomize array element order in-place.
         * Using Fisher-Yates shuffle algorithm.
         * 
         * @param {array} array
         */
        shuffleArray: function(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            
            return array;
        },
        
        /**
         * Append exerciseS elements to DOM
         */
        appendElements: function() {
            var exerciseContent;
            
            for (var i = 0; i < this.elements.length; i++) {
                exerciseContent = this.elements[i].render().el;
                this.$el.find('.content').append(exerciseContent);
            }
        },
        
        /**
         * Render exercise template and append elements
         * 
         * @returns {object}
         */
        render: function() {
            var html = '';
            
            html = this.templateExercise({
                answers: this.getAnswers()
            });
            
            this.$el.html(html);
            this.appendElements();
            
            return this;
        }
        
    });
});