angular.module('classeur.core.settings', [])
	.factory('clSettingSvc', function($templateCache, clLocalStorageObject) {
		var defaultSettings = $templateCache.get('core/settings/defaultSettings.json');
		defaultSettings = JSON.parse(defaultSettings);
		defaultSettings.exportTemplates['Styled HTML'] = $templateCache.get('core/settings/exportTemplateStyledHtml.html');
		defaultSettings.exportTemplates.PDF = $templateCache.get('core/settings/exportTemplatePdf.html');
		defaultSettings = JSON.stringify(defaultSettings);

		var clSettingSvc = clLocalStorageObject('settings', {
			values: {
				default: defaultSettings,
				parser: clLocalStorageObject.simpleObjectParser,
				serializer: clLocalStorageObject.simpleObjectSerializer,
			}
		});

		clSettingSvc.read = function() {
			this.$read();
			this.$readUpdate();
		};

		clSettingSvc.write = function(updated) {
			this.$write();
			updated && this.$writeUpdate(updated);
		};

		function checkAll() {
			if (clSettingSvc.$checkUpdate()) {
				clSettingSvc.read();
				return true;
			} else {
				clSettingSvc.write();
			}
		}

		function updateSettings(values) {
            clSettingSvc.values = values;
		}

		clSettingSvc.checkAll = checkAll;
		clSettingSvc.updateSettings = updateSettings;
		clSettingSvc.defaultValues = JSON.parse(defaultSettings);

		clSettingSvc.read();
		angular.extend(clSettingSvc.values, JSON.parse(defaultSettings), clSettingSvc.values);
		return clSettingSvc;
	})
	.factory('clLocalSettingSvc', function($templateCache, clLocalStorageObject) {
		var defaultLocalSettings = $templateCache.get('core/settings/defaultLocalSettings.json');

		var clLocalSettingSvc = clLocalStorageObject('localSettings', {
			values: {
				default: defaultLocalSettings,
				parser: clLocalStorageObject.simpleObjectParser,
				serializer: clLocalStorageObject.simpleObjectSerializer,
			}
		});

		clLocalSettingSvc.read = function() {
			this.$read();
			this.$readUpdate();
		};

		clLocalSettingSvc.write = function(updated) {
			this.$write();
			updated && this.$writeUpdate(updated);
		};

		function checkAll() {
			if (clLocalSettingSvc.$checkUpdate()) {
				clLocalSettingSvc.read();
				return true;
			} else {
				clLocalSettingSvc.write();
			}
		}

		clLocalSettingSvc.checkAll = checkAll;

		clLocalSettingSvc.read();
		angular.extend(clLocalSettingSvc.values, JSON.parse(defaultLocalSettings), clLocalSettingSvc.values);
		return clLocalSettingSvc;
	});
