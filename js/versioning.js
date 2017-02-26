window.updateVersionData = function(data) {
  window.expoDataVersion = md5(JSON.stringify(data));
  console.log('New version set', window.expoDataVersion);
}

function getVersion() {
  return window.expoDataVersion;
}

function outdated(newData) {
  var newVersion = md5(JSON.stringify(newData));
  console.log('Newest version available', newVersion)
  return window.expoDataVersion != newVersion;
}

function processOutdated(newData) {
  if (outdated(newData) && confirm('New data is available! Press OK to reload now.')) {
    window.location.reload();
  }
}

setInterval(function() {
  Papa.parse("data/data.csv", {
        download: true,
        header: true,
        complete: function(results) {
          processOutdated(results);
        }
  });
}, 60 * 1000);
