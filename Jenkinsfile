@Library ('folio_jenkins_shared_libs') _

buildNPM {
    publishModDescriptor = 'yes'
    runRegression = 'no'
    runLint = 'yes'
    runSonarqube = 'true'
    runScripts = [
      ['test:bigtest': ''],
      ['test:jest': ''],
      ['formatjs-compile': '']
    ]
  }
