"use strict";
(function () {
    let timer = -1; //timer id info
    let millisecondsRemaining = 60 * 2 * 1000;
    let end = -1;
    window.onload = loadFunction;
    /**
     * Sets up the divs by hidding of emptying them if needed
     * This puts sets the UI to the 'home page'
     */
    function loadFunction() {
        document.getElementById("home").onclick = switchToHome;
        document.getElementById("timer").onclick = switchToTimer;
        document.getElementById("register").onclick = switchToRegister;
        document.getElementById("competitors").onclick = switchToResults;

        document.getElementById("regsubmit").onclick = submitForm;
        document.getElementById("filterresults").onclick = filterResults;

        document.getElementById("bluesenshuu").style.color = "white";
        document.getElementById("redsenshuu").style.color = "white";

        document.getElementById("start").onclick = function () {
            let now = new Date;
            end = new Date(+now + millisecondsRemaining);
            timer = setInterval(showRemaining, 10);
        }
        document.getElementById("stop").onclick = function () {
            if (timer !== -1) {
                showRemaining();
                clearInterval(timer);
            }
            timer = -1;
        }
        document.getElementById("reset").onclick = function () {
            if (timer !== -1) {
                clearInterval(timer);
            }
            timer = -1;
            millisecondsRemaining = 60 * 2 * 1000;
            let now = new Date;
            end = new Date(+now + millisecondsRemaining);
            showRemaining();

            document.getElementById("bluebox").innerHTML = 0;
            document.getElementById("redbox").innerHTML = 0;

            document.getElementById("bluesenshuu").style.color = "white";
            document.getElementById("redsenshuu").style.color = "white";

            document.getElementById("redcat1w").style.backgroundColor = "white";
            document.getElementById("redcat1k").style.backgroundColor = "white";
            document.getElementById("redcat1hc").style.backgroundColor = "white";
            document.getElementById("redcat1h").style.backgroundColor = "white";

            document.getElementById("redcat2w").style.backgroundColor = "white";
            document.getElementById("redcat2k").style.backgroundColor = "white";
            document.getElementById("redcat2hc").style.backgroundColor = "white";
            document.getElementById("redcat2h").style.backgroundColor = "white";

            document.getElementById("bluecat1w").style.backgroundColor = "white";
            document.getElementById("bluecat1k").style.backgroundColor = "white";
            document.getElementById("bluecat1hc").style.backgroundColor = "white";
            document.getElementById("bluecat1h").style.backgroundColor = "white";

            document.getElementById("bluecat2w").style.backgroundColor = "white";
            document.getElementById("bluecat2k").style.backgroundColor = "white";
            document.getElementById("bluecat2hc").style.backgroundColor = "white";
            document.getElementById("bluecat2h").style.backgroundColor = "white";
        }

        document.getElementById("bluechangepoints").onclick = function () {
            var blueppoints = document.getElementById("blue+points").value;
            var bluempoints = document.getElementById("blue-points").value;
            var currentpoints = document.getElementById("bluebox").innerHTML;
            var newpoints = Number(blueppoints) + Number(bluempoints) + Number(currentpoints);

            if (newpoints < 0)
            {
                newpoints = 0;
            }

            var redpoints = document.getElementById("redbox").innerHTML;

            if (Number(redpoints) == 0 && Number(currentpoints) == 0 && newpoints > 0){
                document.getElementById("bluesenshuu").style.color = "black";
            }

            if (Number(redpoints) == 0 && newpoints == 0){
                document.getElementById("bluesenshuu").style.color = "white";
                document.getElementById("redsenshuu").style.color = "white";
            }

            document.getElementById("blue+points").selectedIndex = 0;
            document.getElementById("blue-points").selectedIndex = 0;

            document.getElementById("bluebox").innerHTML = newpoints;
        }

        document.getElementById("redchangepoints").onclick = function () {
            var redppoints = document.getElementById("red+points").value;
            var redmpoints = document.getElementById("red-points").value;
            var currentpoints = document.getElementById("redbox").innerHTML;
            var newpoints = Number(redppoints) + Number(redmpoints) + Number(currentpoints);

            if (newpoints < 0)
            {
                newpoints = 0;
            }

            var bluepoints = document.getElementById("bluebox").innerHTML;
            if (Number(bluepoints) == 0 && Number(currentpoints) == 0 && newpoints > 0){
                document.getElementById("redsenshuu").style.color = "black";
            }

            if (Number(bluepoints) == 0 && newpoints == 0 ){
                document.getElementById("bluesenshuu").style.color = "white";
                document.getElementById("redsenshuu").style.color = "white";
            }
            
            document.getElementById("red+points").selectedIndex = 0;
            document.getElementById("red-points").selectedIndex = 0;

            document.getElementById("redbox").innerHTML = newpoints;
        }

        //Red Category 1 Penalties
        document.getElementById("redcat1w").onclick = function () {
            document.getElementById("redcat1w").style.backgroundColor = "grey";
            document.getElementById("redcat1k").style.backgroundColor = "white";
            document.getElementById("redcat1hc").style.backgroundColor = "white";
            document.getElementById("redcat1h").style.backgroundColor = "white";
        }

        document.getElementById("redcat1k").onclick = function () {
            document.getElementById("redcat1w").style.backgroundColor = "grey";
            document.getElementById("redcat1k").style.backgroundColor = "grey";
            document.getElementById("redcat1hc").style.backgroundColor = "white";
            document.getElementById("redcat1h").style.backgroundColor = "white";
        }

        document.getElementById("redcat1hc").onclick = function () {
            document.getElementById("redcat1w").style.backgroundColor = "grey";
            document.getElementById("redcat1k").style.backgroundColor = "grey";
            document.getElementById("redcat1hc").style.backgroundColor = "grey";
            document.getElementById("redcat1h").style.backgroundColor = "white";
        }

        document.getElementById("redcat1h").onclick = function () {
            document.getElementById("redcat1w").style.backgroundColor = "grey";
            document.getElementById("redcat1k").style.backgroundColor = "grey";
            document.getElementById("redcat1hc").style.backgroundColor = "grey";
            document.getElementById("redcat1h").style.backgroundColor = "grey";

            var snd = new Audio("buzzer2.mp3");
            snd.play();
        }

        //Red Category 2 penalties
        document.getElementById("redcat2w").onclick = function () {
            document.getElementById("redcat2w").style.backgroundColor = "grey";
            document.getElementById("redcat2k").style.backgroundColor = "white";
            document.getElementById("redcat2hc").style.backgroundColor = "white";
            document.getElementById("redcat2h").style.backgroundColor = "white";
        }

        document.getElementById("redcat2k").onclick = function () {
            document.getElementById("redcat2w").style.backgroundColor = "grey";
            document.getElementById("redcat2k").style.backgroundColor = "grey";
            document.getElementById("redcat2hc").style.backgroundColor = "white";
            document.getElementById("redcat2h").style.backgroundColor = "white";
        }

        document.getElementById("redcat2hc").onclick = function () {
            document.getElementById("redcat2w").style.backgroundColor = "grey";
            document.getElementById("redcat2k").style.backgroundColor = "grey";
            document.getElementById("redcat2hc").style.backgroundColor = "grey";
            document.getElementById("redcat2h").style.backgroundColor = "white";
        }

        document.getElementById("redcat2h").onclick = function () {
            document.getElementById("redcat2w").style.backgroundColor = "grey";
            document.getElementById("redcat2k").style.backgroundColor = "grey";
            document.getElementById("redcat2hc").style.backgroundColor = "grey";
            document.getElementById("redcat2h").style.backgroundColor = "grey";

            var snd = new Audio("buzzer2.mp3");
            snd.play();
        }

        //Blue Category 1 penalties
        document.getElementById("bluecat1w").onclick = function () {
            document.getElementById("bluecat1w").style.backgroundColor = "grey";
            document.getElementById("bluecat1k").style.backgroundColor = "white";
            document.getElementById("bluecat1hc").style.backgroundColor = "white";
            document.getElementById("bluecat1h").style.backgroundColor = "white";
        }

        document.getElementById("bluecat1k").onclick = function () {
            document.getElementById("bluecat1w").style.backgroundColor = "grey";
            document.getElementById("bluecat1k").style.backgroundColor = "grey";
            document.getElementById("bluecat1hc").style.backgroundColor = "white";
            document.getElementById("bluecat1h").style.backgroundColor = "white";
        }

        document.getElementById("bluecat1hc").onclick = function () {
            document.getElementById("bluecat1w").style.backgroundColor = "grey";
            document.getElementById("bluecat1k").style.backgroundColor = "grey";
            document.getElementById("bluecat1hc").style.backgroundColor = "grey";
            document.getElementById("bluecat1h").style.backgroundColor = "white";
        }

        document.getElementById("bluecat1h").onclick = function () {
            document.getElementById("bluecat1w").style.backgroundColor = "grey";
            document.getElementById("bluecat1k").style.backgroundColor = "grey";
            document.getElementById("bluecat1hc").style.backgroundColor = "grey";
            document.getElementById("bluecat1h").style.backgroundColor = "grey";

            var snd = new Audio("buzzer2.mp3");
            snd.play();
        }

        //Blue Category 2 penalties
        document.getElementById("bluecat2w").onclick = function () {
            document.getElementById("bluecat2w").style.backgroundColor = "grey";
            document.getElementById("bluecat2k").style.backgroundColor = "white";
            document.getElementById("bluecat2hc").style.backgroundColor = "white";
            document.getElementById("bluecat2h").style.backgroundColor = "white";
        }

        document.getElementById("bluecat2k").onclick = function () {
            document.getElementById("bluecat2w").style.backgroundColor = "grey";
            document.getElementById("bluecat2k").style.backgroundColor = "grey";
            document.getElementById("bluecat2hc").style.backgroundColor = "white";
            document.getElementById("bluecat2h").style.backgroundColor = "white";
        }

        document.getElementById("bluecat2hc").onclick = function () {
            document.getElementById("bluecat2w").style.backgroundColor = "grey";
            document.getElementById("bluecat2k").style.backgroundColor = "grey";
            document.getElementById("bluecat2hc").style.backgroundColor = "grey";
            document.getElementById("bluecat2h").style.backgroundColor = "white";
        }

        document.getElementById("bluecat2h").onclick = function () {
            document.getElementById("bluecat2w").style.backgroundColor = "grey";
            document.getElementById("bluecat2k").style.backgroundColor = "grey";
            document.getElementById("bluecat2hc").style.backgroundColor = "grey";
            document.getElementById("bluecat2h").style.backgroundColor = "grey";

            var snd = new Audio("buzzer2.mp3");
            snd.play();
        }

        switchToHome();
    }
    function switchToHome() {
        document.getElementById("homePage").style.display = 'block';
        document.getElementById("timerPage").style.display = 'none';
        document.getElementById("registerPage").style.display = 'none';
        document.getElementById("resultsPage").style.display = 'none';
    }
    function switchToTimer() {
        document.getElementById("homePage").style.display = 'none';
        document.getElementById("timerPage").style.display = 'flex';
        document.getElementById("registerPage").style.display = 'none';
        document.getElementById("resultsPage").style.display = 'none';
    }
    function switchToRegister() {
        document.getElementById("homePage").style.display = 'none';
        document.getElementById("timerPage").style.display = 'none';
        document.getElementById("registerPage").style.display = 'block';
        document.getElementById("resultsPage").style.display = 'none';
    }
    function switchToResults() {
        document.getElementById("homePage").style.display = 'none';
        document.getElementById("timerPage").style.display = 'none';
        document.getElementById("registerPage").style.display = 'none';
        document.getElementById("resultsPage").style.display = 'block';

        createTableFromJSON();
    }

    function showRemaining() {
        let now = new Date();
        millisecondsRemaining = end - now;
        if (millisecondsRemaining <= 0) {
            // handle expiry here..
            clearInterval(timer); // stop the timer from continuing ..
            millisecondsRemaining = 0;
        }
        let _second = 1000;
        let _minute = _second * 60;
        let _hour = _minute * 60;
        let minutes = Math.floor((millisecondsRemaining % _hour) / _minute);
        let seconds = Math.floor((millisecondsRemaining % _minute) / _second);
        let milliseconds = millisecondsRemaining % _second;
        let countdownElement = document.getElementById('time');
        countdownElement.innerHTML = ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2) + '.' + ("00" + milliseconds).slice(-3);

        if (minutes == 0 && seconds == 0 && milliseconds == 0)
        {
            var snd = new Audio("buzzer2.mp3");
            snd.play();
        }
    }

    function submitForm() {
        var contName = document.getElementById("cont-name").value;
        var contEmail = document.getElementById("email").value;
        var contPhone = document.getElementById("phone").value;

        var compfname = document.getElementById("compfirstname").value;
        var complname = document.getElementById("complastname").value;
        var experience = document.getElementById("exp").value;
        var age = document.getElementById("age").value;
        var gender = document.getElementById("gender").value.substring(0, 1);

        var genderUp = gender.toUpperCase();

        var clientjsontext = '{"clientemail":"' + contEmail + '","clientphone":"' + contPhone + '","clientname":"' + contName + '"}';
        var compjsontext = '{"compname":"' + compfname + ' ' + complname + '","compid":"0","compage":"' + age + '","compskill":"' + experience + '","compdiv":"' + genderUp + '"' + ',"assocemail":"' + contEmail + '"}';

        const url1 = 'http://127.0.0.1:5000/addclient';
        const clientPram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: clientjsontext,
            method: "POST"
        };

        fetch(url1, clientPram)
            .then(data => { return data.json() })
            .then(res => { console.log(res) })
            .catch(error => console.log(error));

        setInterval(doNothing, 5000);

        const url2 = 'http://127.0.0.1:5000/addcompetitor';
        const competitorPram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: compjsontext,
            method: "POST"
        };

        fetch(url2, competitorPram)
        .then(data => { return data.json() })
        .then(res => { console.log(res) })
        .catch(error => console.log(error));

        alert("Thank you for your registration");
    }

    function filterResults() {
        var obj;
        var url;

        var compname = document.getElementById("compnamefilter").value;
        var experience = document.getElementById("expfilter").value;
        var agemin = document.getElementById("ageminfilter").value;
        var agemax = document.getElementById("agemaxfilter").value;
        var gender = document.getElementById("genderfilter").value.substring(0, 1);
        var genderUp = gender.toUpperCase();

        var table = document.getElementById("allcompetitors");

        for(var i = table.rows.length - 1; i > 0; i--)
        {
            table.deleteRow(i);
        }

        document.getElementById("expfilter").selectedIndex = 0;
        document.getElementById("genderfilter").selectedIndex = 0;

        if (compname && experience)
        {
            if (agemax && agemin)
            {
                //Do nothing, we're all set
            }

            else if (agemax)
            {
                agemin = agemax;
            }

            else if (agemin)
            {
                agemax = agemin;
            }

            else
            {
                agemin = 0;
                agemax = 100;
            }

            url = 'http://127.0.0.1:5000/filternameexp/' + compname + '/' + experience + '/' + agemin + '/' + agemax;
        }

        else if (compname && gender)
        {
            if (agemax && agemin)
            {
                //Do nothing, we're all set
            }

            else if (agemax)
            {
                agemin = agemax;
            }

            else if (agemin)
            {
                agemax = agemin;
            }

            else
            {
                agemin = 0;
                agemax = 100;
            }

            url = 'http://127.0.0.1:5000/filternamegender/' + compname + '/' + agemin + '/' + agemax + '/' + genderUp;
        }

        else if (experience && gender)
        {
            if (agemax && agemin)
            {
                //Do nothing, we're all set
            }

            else if (agemax)
            {
                agemin = agemax;
            }

            else if (agemin)
            {
                agemax = agemin;
            }

            else
            {
                agemin = 0;
                agemax = 100;
            }

            url = 'http://127.0.0.1:5000/filterexpgender/' + experience + '/' + agemin + '/' + agemax + '/' + genderUp;
        }

        else if (compname && experience && gender)
        {
            if (agemax && agemin)
            {
                //Do nothing, we're all set
            }

            else if (agemax)
            {
                agemin = agemax;
            }

            else if (agemin)
            {
                agemax = agemin;
            }

            else
            {
                agemin = 0;
                agemax = 100;
            }

            url = 'http://127.0.0.1:5000/filterresults/' + compname + '/' + experience + '/' + agemin + '/' + agemax + '/' + genderUp;
        }

        else
        {
            if (compname)
            {
                if (agemax && agemin)
                {
                    //Do nothing, we're all set
                }

                else if (agemax)
                {
                    agemin = agemax;
                }

                else if (agemin)
                {
                    agemax = agemin;
                }

                else
                {
                    agemin = 0;
                    agemax = 100;
                }

                url = 'http://127.0.0.1:5000/filtername/' + compname + '/' + agemin + '/' + agemax;
            }

            else if (experience)
            {
                if (agemax && agemin)
                {
                    //Do nothing, we're all set
                }

                else if (agemax)
                {
                    agemin = agemax;
                }

                else if (agemin)
                {
                    agemax = agemin;
                }

                else
                {
                    agemin = 0;
                    agemax = 100;
                }

                url = 'http://127.0.0.1:5000/filterexp/' + experience + '/' + agemin + '/' + agemax;
            }

            else if (gender)
            {
                if (agemax && agemin)
                {
                    //Do nothing, we're all set
                }

                else if (agemax)
                {
                    agemin = agemax;
                }

                else if (agemin)
                {
                    agemax = agemin;
                }

                else
                {
                    agemin = 0;
                    agemax = 100;
                }

                url = 'http://127.0.0.1:5000/filtergender/' + gender + '/' + agemin + '/' + agemax;
            }

            else
            {
                if (agemax && agemin)
                {
                    url = 'http://127.0.0.1:5000/filterage/' + agemin + '/' + agemax;
                }

                else if (agemax)
                {
                    agemin = agemax
                    url = 'http://127.0.0.1:5000/filterage/' + agemin + '/' + agemax;
                }

                else if (agemin)
                {
                    agemax = agemin;
                    url = 'http://127.0.0.1:5000/filterage/' + agemin + '/' + agemax;
                }

                else
                {
                    createTableFromJSON();
                }
            }
        }
       
        fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        },
        ).then(res => res.json())
        .then(data => obj = data)
        .then(function() {
            var table = document.getElementById("allcompetitors");
            var col = [];
            for (var i = 0; i <= obj.length-1; i++) {
                for (var key in obj[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            var tr = table.insertRow(-1);

            for (var i = 0; i < obj.length; i++) {
                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);

                    if (j == 0)
                    {
                        tabCell.innerHTML = obj[i][col[4]];
                    }

                    else if (j == 1)
                    {
                        tabCell.innerHTML = obj[i][col[1]];
                    }

                    else if (j == 2)
                    {
                        tabCell.innerHTML = obj[i][col[2]];
                    }

                    else if (j == 3)
                    {
                        tabCell.innerHTML = obj[i][col[3]];
                    }

                    else if (j == 4)
                    {
                        tabCell.innerHTML = obj[i][col[5]];
                    }
                }
            }
            })
        .then(() => console.log(obj));
    }

    function createTableFromJSON() {
        var obj;

        const url = 'http://127.0.0.1:5000/competitors';
        fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        },
        ).then(res => res.json())
        .then(data => obj = data)
        .then(function() {
            var table = document.getElementById("allcompetitors");
            var col = [];
            for (var i = 0; i < obj.length-1; i++) {
                for (var key in obj[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            var tr = table.insertRow(-1);

            for (var i = 0; i < obj.length; i++) {
                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);

                    if (j == 0)
                    {
                        tabCell.innerHTML = obj[i][col[4]];
                    }

                    else if (j == 1)
                    {
                        tabCell.innerHTML = obj[i][col[1]];
                    }

                    else if (j == 2)
                    {
                        tabCell.innerHTML = obj[i][col[2]];
                    }

                    else if (j == 3)
                    {
                        tabCell.innerHTML = obj[i][col[3]];
                    }

                    else if (j == 4)
                    {
                        tabCell.innerHTML = obj[i][col[5]];
                    }
                }
            }
            })
        .then(() => console.log(obj));
    }

    function doNothing(){
    }
    /**
     *handles an unknown error
    */
    function errorHandle() {
        //do nothing since was not required on specs
    }
})();