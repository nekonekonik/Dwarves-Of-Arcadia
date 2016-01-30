'use strict';

angular.module('dwarvesOfArcadiaApp')
  .service('session', function session($window) {
    
    // storage key
    var LOCAL_STORAGE_ID = 'dwarvesOfArcadia';

    // if data is false, delete old data
    function saveToDisk(data) {
      if (data) {
        $window.sessionStorage[LOCAL_STORAGE_ID] = JSON.stringify(data);
      } else {
        delete $window.sessionStorage[LOCAL_STORAGE_ID];
      }
    }

    // singleton to load the context from local storage or from scratch
    function loadFromDisk() {
      try {
        return JSON.parse($window.sessionStorage[LOCAL_STORAGE_ID]);
      } catch (e) {
        return null;
      }
    }
    var _session = loadFromDisk();

    // read-only getters
    this.name = function () { return _session.name || ''; };

    this.save = function (data) {
      _session = angular.copy(data); // protect our copy from outside modification
      if (_session) {
        _session.remember = Date.now();
      }
      saveToDisk(_session);
    };

    this.setName = function (name) {
      if (name) {
        if (!_session) {
          _session = {};
        }
        _session.name = name;
        saveToDisk(_session);
      }
    };

  });