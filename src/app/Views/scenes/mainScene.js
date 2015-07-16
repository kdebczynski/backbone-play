define([
    'BaseScene',
    'dot',
    'text!templates/scenes/main.html',
    'text!templates/components/exercises/ex1.html',
    'text!templates/components/exercises/ex2.html',
    'Views/components/Navigation',
    'Views/components/Slider',
    'Views/components/Exercise',
    'Views/components/FillInItem',
    'Collections/FillIn'
], function(
    BaseScene,
    dot,
    template,
    templateEx1,
    templateEx2,
    Navigation,
    Slider,
    Exercise,
    FillInItem,
    CollectionFillIn
) {
    return BaseScene.extend({
        
        /**
         * Component class name
         */
        className: 'main-scene',
        
        /**
         * MainScene template
         */
        template: dot.compile(template),
        
        /**
         * Initialize main scene
         */
        initialize: function() {
            BaseScene.prototype.initialize.apply(this, arguments);
            
            this.bindEvents();
            this.initializeCollections();
        },
        
        /**
         * Collections of FillInModels used to make exercises with FillIn fields
         */
        initializeCollections: function() {
            this.exercise1Collection = new CollectionFillIn([
                {id: 1, label: '1', answer: 'foggy', isExample: false},
                {id: 2, label: '2', answer: 'raining', isExample: false},
                {id: 3, label: '3', answer: 'sunny', isExample: false},
                {id: 4, label: '4', answer: 'cloudy', isExample: false},
                {id: 5, label: '5', answer: 'windy', isExample: false},
                {id: 6, label: '6', answer: 'snowing', isExample: false}
            ]);
            
            this.exercise2Collection = new CollectionFillIn([
                {id: 1, label: 'enjoying a field trip', answer: '2', isExample: false},
                {id: 2, label: 'working on computers', answer: '3', isExample: false},
                {id: 3, label: 'taking a test', answer: '4', isExample: false},
                {id: 4, label: 'doing a project', answer: '1', isExample: false},
                {id: 5, label: 'giving a presentation', answer: '5', isExample: true},
                {id: 6, label: 'practicing yoga', answer: '6', isExample: false}
            ]);
        },
        
        /**
         * Handle scene events
         */
        bindEvents: function () {
            var that = this;
            
            this.on('after:append', function() {
                console.log('mainScene after:append');
                that.appendSlider(that.createExercises());
                that.appendNavigation();
            });
        },
        
        /**
         * Create exercise by given colection, template and id
         * 
         * @param {CollectionFillIn} collection
         * @param {type} template
         * @param {type} id
         * @returns {Exercise}
         */
        createExerciseByCollection: function(collection, template, id) {
            var elements = [];
            
            collection.each(function(item) {
                elements.push(new FillInItem({
                    model: item,
                    id: id + '-item-' + item.get('id')
                }));
            });
            
            return new Exercise({
                templateExercise: template,
                elements: elements,
                id: id
            });
        },
        
        /**
         * Create two exercises components that will be passed to slider
         * @returns Array
         */
        createExercises: function() {
            var exercises = [];
            
            exercises.push({
                showTriggerValue: 6,
                component: this.createExerciseByCollection(
                        this.exercise1Collection,
                        templateEx1,
                        "exercise-" + 6
                )
            });
            exercises.push({
                showTriggerValue: 7,
                component: this.createExerciseByCollection(
                        this.exercise2Collection,
                        templateEx2,
                        "exercise-" + 7
                )
            });
            
            return exercises;
        },
        
        /**
         * Append slider with given slides components to DOM
         *  
         * @param {Array} slides
         */
        appendSlider: function(slides) {
            this.slider = new Slider({
                slides: slides
            });
            this.slider.render();
            this.$el.children('#top').append(this.slider.el);
        },
        
        /**
         * Append navigation component to DOM
         * Navigation is setted up by example configuration of sections and steps
         * Only two steps are allowed to navigate (navigationLimit config)
         */
        appendNavigation: function() {
            var that = this;
            
            this.navigation = new Navigation({
                config: [[1, 2], [3, 4, 5], [6, 7], [8], [9, 10], [11, 12]],
                activeStep: 6,
                navigationLimit: {
                    stepMin: 6,
                    stepMax: 7
                }
            });
            
            /**
             * When navigating then show correct slide by slide number (trigger value)
             */
            this.navigation.on('navigation:changed', function() {
                that.slider.showSlideByTriggerVal(that.navigation.currentStep);
            });
            
            this.navigation.render();
            this.$el.children('#bottom').append(this.navigation.el);
        },
        
        /**
         * Render template for main scene and setup rendered html
         */
        render: function() {
            this.el.innerHTML = this.template();
        }

    });
});