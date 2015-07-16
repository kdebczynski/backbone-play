define([
  'underscore',
  'backbone'
], function(
   _,
   Backbone
){
  
  var sceneManager = (function () {
      var scenes = {},
          activeSceneName = null;
      
      function showScene(sceneName) {
          var scene,
              shownScene;
          
          if (activeSceneName === sceneName) {
              return;
          }
          
          scene = scenes[sceneName];
          
          console.log('sceneManager:showScene - ' + sceneName);
          
          if (activeSceneName !== null) {
              shownScene = scenes[activeSceneName];
              shownScene.trigger('before:hide');
              shownScene.hide();
              shownScene.trigger('after:hide');
          }
          
          scene.trigger('before:show');
          scene.show();
          scene.trigger('after:show');
          activeSceneName = sceneName;
      }
      
      function show(sceneName) {
          if (typeof scenes[sceneName] === 'undefined') {
              require(['Views/scenes/' + sceneName], function(Scene) {
                var view = new Scene({});
                
                scenes[sceneName] = view;
                
                view.trigger('before:render');
                view.render();
                view.trigger('after:render');
                document.body.appendChild(view.el);
                view.trigger('after:append');
                
                console.log('sceneManager:show - New scene added to DOM (' + sceneName + ')');
                
                showScene(sceneName);
              });
          } else {
              showScene(sceneName);
          }
      }
      
      return {
          show: show
      };
      
  })();
  
  return _.extend(sceneManager, Backbone.Events);
  
});