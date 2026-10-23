try { window.personalData=PersonalDictionary.load(); }
catch(error) { window.personalLoadError=error;window.personalData={version:1,groups:[]}; }
PersonalDictionary.install(window.personalData);
