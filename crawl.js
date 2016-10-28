(function (initUrl) {
    var options = {}, countries = [], countryIndex = 0, countryLen = 0, provinceInex = 0,provinceLen=0;


    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function (m, i) {
                return args[i];
            });
    };
    function log(str) {
        if (str == undefined || str == null)return;
        var o = $("#____crawllog");
        if (o.length <= 0) {
            o = $("<div id='____crawllog'></div>");
            $("body").append(o);
        }
        str = str.toString();
        var i = $("<p>" + str + "</p>");
        o.append(i);
    }

    function getUrl(id) {
        var url = "https://mp.weixin.qq.com/cgi-bin/getregions?t=setting/ajax-getregions&id={0}&token={1}&lang=zh_CN&f=json&ajax=1&random={2}";
        return url.format(id, options.token, (new Date()).getTime());
    };
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function crawl(initUrl) {

        options = {
            token: getQueryString("token")

        };


        $.get(initUrl, function (result) {

            countries = result.data;

            countryIndex=0;
            countryLen = countries.length;

            readProvinceData(countries[0]);

        });


    }

    function readProvinceData(country) {

        $.get(getUrl(country.id), function (result) {

            country.provinces = result.data||[];
            countryIndex++;
            if (countryIndex < countryLen){

                readProvinceData(countries[countryIndex]);
            }
            else {
                //debugger;
                countryIndex = 0;
                provinceInex=0;
                provinceLen=countries[countryIndex].provinces.length;
                log(JSON.stringify(countries));

                readCityData(countries[countryIndex].provinces[provinceInex]);
            }
        });

    }
    function readCityData(province){
        if(!province){
            countryIndex++;

            if(countryIndex<countryLen)
            {
                provinceInex=0;
                provinceLen=countries[countryIndex].provinces.length;
                readCityData(countries[countryIndex].provinces[provinceInex]);

            }
            else{
                debugger;
                //½áÊø;
                log(JSON.stringify(countries));
            }

            return;
        }
        $.get(getUrl(province.id), function (result) {

            province.cities = result.data;

            provinceInex++;
            if(provinceInex<provinceLen)
            {
                readCityData(countries[countryIndex].provinces[provinceInex]);
            }
            else{
                countryIndex++;

                if(countryIndex<countryLen)
                {
                    provinceInex=0;
                    provinceLen=countries[countryIndex].provinces.length;
                    readCityData(countries[countryIndex].provinces[provinceInex]);

                }
                else{
                    debugger;
                    //½áÊø;
                    log(JSON.stringify(countries));
                }
            }
        });
    }

    crawl(initUrl);

})("url");