// Task 1: Load data
// Task 2.1: User gives a single attribute as input, we need to draw lines for that attribute.
// Tasl 2.2: User gives region or regions as input. So, given a region, you should be able to get all
//         the countries belonging to that region.
// Task 3: Draw ONE line for EACH country in the newly selected region.
//          Task 3.1: Find a way to aggregate data of each country. Remember "groupby" queries in SQL
// Task 4: If the user changes the attribute, lines must dynamically update to the new values
//         for that attribute.
// Tasl 5: If the user selects a new region, call a function that FIRST animates the y-axis AND existing
//         lines to the new axis. Then, add the lines for new region (use fade-in transition).
// Task 6: If the used removed a region, FIRST the lines for that region should fade out, then the y-axis
//         must animate to fit only the existing lines (i.e. reset the axis) and together the existing
//         lines should also animate to the new axis.
// Task 7: Add animation for lines.
// Task 8: Add opacity slider.
// Task 9: Emphasize the line that is being hovered upon. And de-emphasize other lines.



var region_dict = { "East Asia & Pacific": ["Australia", "Brunei", "Cambodia", "China", "Fiji", "Hong Kong, China", "Indonesia", "Japan", "Kiribati", "North Korea", "South Korea", "Lao", "Malaysia", "Marshall Islands", "Micronesia, Fed. Sts.", "Mongolia", "Myanmar", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Philippines", "Samoa", "Singapore", "Solomon Islands", "Taiwan", "Thailand", "Timor-Leste", "Tonga", "Tuvalu", "Vanuatu", "Vietnam"], "Europe & Central Asia": ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Holy See", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kyrgyz Republic", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia, FYR", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovak Republic", "Slovenia", "Spain", "Sweden", "Switzerland", "Tajikistan", "Turkey", "Turkmenistan", "Ukraine", "United Kingdom", "Uzbekistan"], "Latin America & Caribbean": ["Antigua and Barbuda", "Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "Ecuador", "El Salvador", "Grenada", "Guatemala", "Guyana", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Paraguay", "Peru", "St. Kitts and Nevis", "St. Lucia", "St. Vincent and the Grenadines", "Suriname", "Trinidad and Tobago", "Uruguay", "Venezuela"], "Middle East & North Africa": ["Algeria", "Bahrain", "Djibouti", "Egypt", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", "Libya", "Malta", "Morocco", "Oman", "Qatar", "Saudi Arabia", "Syria", "Tunisia", "United Arab Emirates", "Palestine", "Yemen"], "North America": ["Canada", "United States"], "South Asia": ["Afghanistan", "Bangladesh", "Bhutan", "India", "Maldives", "Nepal", "Pakistan", "Sri Lanka"], "Sub-Saharan Africa": ["Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros", "Congo, Dem. Rep.", "Congo, Rep.", "Cote d_Ivoire", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe", "South Sudan"] }
var country_to_geo = { 'Canada': 'can', 'Sao Tome and Principe': 'stp', 'Cambodia': 'khm', 'Ethiopia': 'eth', 'Sri Lanka': 'lka', 'Swaziland': 'swz', 'Argentina': 'arg', 'Bolivia': 'bol', 'Burkina Faso': 'bfa', 'Bahrain': 'bhr', 'Saudi Arabia': 'sau', 'Guatemala': 'gtm', 'Guinea': 'gin', 'St. Lucia': 'lca', 'Congo, Rep.': 'cog', 'Spain': 'esp', 'Liberia': 'lbr', 'Maldives': 'mdv', 'Oman': 'omn', 'Tanzania': 'tza', 'Gabon': 'gab', 'New Zealand': 'nzl', 'Jamaica': 'jam', 'Albania': 'alb', 'United Arab Emirates': 'are', 'India': 'ind', 'Madagascar': 'mdg', 'Lesotho': 'lso', 'Turkey': 'tur', 'Bangladesh': 'bgd', 'Solomon Islands': 'slb', 'Lebanon': 'lbn', 'Mongolia': 'mng', 'France': 'fra', 'Rwanda': 'rwa', 'Somalia': 'som', 'Peru': 'per', 'Vanuatu': 'vut', 'Norway': 'nor', "Cote d_Ivoire": 'civ', 'Benin': 'ben', 'Cuba': 'cub', 'Cameroon': 'cmr', 'Togo': 'tgo', 'China': 'chn', 'Dominican Republic': 'dom', 'Germany': 'deu', 'Ghana': 'gha', 'Tonga': 'ton', 'Indonesia': 'idn', 'Colombia': 'col', 'Libya': 'lby', 'Finland': 'fin', 'Central African Republic': 'caf', 'Sweden': 'swe', 'Vietnam': 'vnm', 'Guyana': 'guy', 'Kenya': 'ken', 'Bulgaria': 'bgr', 'Mauritius': 'mus', 'Romania': 'rou', 'Angola': 'ago', 'South Africa': 'zaf', 'St. Vincent and the Grenadines': 'vct', 'Fiji': 'fji', 'Austria': 'aut', 'Mozambique': 'moz', 'Uganda': 'uga', 'Japan': 'jpn', 'Niger': 'ner', 'United States': 'usa', 'Brazil': 'bra', 'Afghanistan': 'afg', 'Kuwait': 'kwt', 'Panama': 'pan', 'Mali': 'mli', 'Costa Rica': 'cri', 'Ireland': 'irl', 'Pakistan': 'pak', 'Nigeria': 'nga', 'Ecuador': 'ecu', 'Australia': 'aus', 'Algeria': 'dza', 'El Salvador': 'slv', 'Chile': 'chl', 'Thailand': 'tha', 'Haiti': 'hti', 'Belize': 'blz', 'Sierra Leone': 'sle', 'Nepal': 'npl', 'Denmark': 'dnk', 'Philippines': 'phl', 'Portugal': 'prt', 'Morocco': 'mar', 'Namibia': 'nam', 'Guinea-Bissau': 'gnb', 'Kiribati': 'kir', 'Switzerland': 'che', 'Grenada': 'grd', 'Iraq': 'irq', 'Chad': 'tcd', 'Uruguay': 'ury', 'Equatorial Guinea': 'gnq', 'Djibouti': 'dji', 'Antigua and Barbuda': 'atg', 'Burundi': 'bdi', 'Cyprus': 'cyp', 'Barbados': 'brb', 'Qatar': 'qat', 'Italy': 'ita', 'Bhutan': 'btn', 'Sudan': 'sdn', 'Singapore': 'sgp', 'Malta': 'mlt', 'Netherlands': 'nld', 'Suriname': 'sur', 'Israel': 'isr', 'Malaysia': 'mys', 'Iceland': 'isl', 'Zambia': 'zmb', 'Senegal': 'sen', 'Papua New Guinea': 'png', 'Malawi': 'mwi', 'Zimbabwe': 'zwe', 'Jordan': 'jor', 'Poland': 'pol', 'Mauritania': 'mrt', 'Trinidad and Tobago': 'tto', 'Hungary': 'hun', 'Honduras': 'hnd', 'Myanmar': 'mmr', 'Mexico': 'mex', 'Tunisia': 'tun', 'Nicaragua': 'nic', 'Congo, Dem. Rep.': 'cod', 'Comoros': 'com', 'United Kingdom': 'gbr', 'Greece': 'grc', 'Paraguay': 'pry', 'Botswana': 'bwa' }
var tenAttribute = ["Data.Health.Birth Rate", "Data.Health.Death Rate", "Data.Health.Fertility Rate", "Data.Health.Life Expectancy at Birth, Female", "Data.Health.Life Expectancy at Birth, Male", "Data.Health.Life Expectancy at Birth, Total", "Data.Health.Population Growth", "Data.Health.Total Population", "Data.Infrastructure.Mobile Cellular Subscriptions", "Data.Infrastructure.Mobile Cellular Subscriptions per 100 People"]
var flag_code = { 'Afghanistan': 'af', 'Albania': 'al', 'Algeria': 'dz', 'Andorra': 'ad', 'Angola': 'ao', 'Antigua and Barbuda': 'ag', 'Argentina': 'ar', 'Armenia': 'am', 'Australia': 'au', 'Austria': 'at', 'Azerbaijan': 'az', 'Bahamas': 'bs', 'Bahrain': 'bh', 'Bangladesh': 'bd', 'Barbados': 'bb', 'Belarus': 'by', 'Belgium': 'be', 'Belize': 'bz', 'Benin': 'bj', 'Bhutan': 'bt', 'Bolivia': 'bo', 'Bosnia and Herzegovina': 'ba', 'Botswana': 'bw', 'Brazil': 'br', 'Brunei': 'in', 'Bulgaria': 'bg', 'Burkina Faso': 'bf', 'Burundi': 'bi', 'Cambodia': 'kh', 'Cameroon': 'cm', 'Canada': 'ca', 'Cape Verde': 'in', 'Central African Republic': 'cf', 'Chad': 'td', 'Chile': 'cl', 'China': 'cn', 'Colombia': 'co', 'Comoros': 'km', 'Congo, Dem. Rep.': 'in', 'Congo, Rep.': 'in', 'Costa Rica': 'cr', "Cote d'Ivoire": 'in', 'Croatia': 'hr', 'Cuba': 'cu', 'Cyprus': 'cy', 'Czech Republic': 'cz', 'Denmark': 'dk', 'Djibouti': 'dj', 'Dominica': 'dm', 'Dominican Republic': 'do', 'Ecuador': 'ec', 'Egypt': 'eg', 'El Salvador': 'sv', 'Equatorial Guinea': 'gq', 'Eritrea': 'er', 'Estonia': 'ee', 'Ethiopia': 'et', 'Fiji': 'fj', 'Finland': 'fi', 'France': 'fr', 'Gabon': 'ga', 'Gambia': 'gm', 'Georgia': 'ge', 'Germany': 'de', 'Ghana': 'gh', 'Greece': 'gr', 'Grenada': 'gd', 'Guatemala': 'gt', 'Guinea': 'gn', 'Guinea-Bissau': 'gw', 'Guyana': 'gy', 'Haiti': 'ht', 'Holy See': 'va', 'Honduras': 'hn', 'Hong Kong, China': 'in', 'Hungary': 'hu', 'Iceland': 'is', 'India': 'in', 'Indonesia': 'id', 'Iran': 'ir', 'Iraq': 'iq', 'Ireland': 'ie', 'Israel': 'il', 'Italy': 'it', 'Jamaica': 'jm', 'Japan': 'jp', 'Jordan': 'jo', 'Kazakhstan': 'kz', 'Kenya': 'ke', 'Kiribati': 'ki', 'North Korea': 'kp', 'South Korea': 'kr', 'Kuwait': 'kw', 'Kyrgyz Republic': 'in', 'Lao': 'in', 'Latvia': 'lv', 'Lebanon': 'lb', 'Lesotho': 'ls', 'Liberia': 'lr', 'Libya': 'ly', 'Liechtenstein': 'li', 'Lithuania': 'lt', 'Luxembourg': 'lu', 'Macedonia, FYR': 'in', 'Madagascar': 'mg', 'Malawi': 'mw', 'Malaysia': 'my', 'Maldives': 'mv', 'Mali': 'ml', 'Malta': 'mt', 'Marshall Islands': 'mh', 'Mauritania': 'mr', 'Mauritius': 'mu', 'Mexico': 'mx', 'Micronesia, Fed. Sts.': 'in', 'Moldova': 'md', 'Monaco': 'mc', 'Mongolia': 'mn', 'Montenegro': 'me', 'Morocco': 'ma', 'Mozambique': 'mz', 'Myanmar': 'mm', 'Namibia': 'na', 'Nauru': 'nr', 'Nepal': 'np', 'Netherlands': 'nl', 'New Zealand': 'nz', 'Nicaragua': 'ni', 'Niger': 'ne', 'Nigeria': 'ng', 'Norway': 'no', 'Oman': 'om', 'Pakistan': 'pk', 'Palau': 'pw', 'Panama': 'pa', 'Papua New Guinea': 'pg', 'Paraguay': 'py', 'Peru': 'pe', 'Philippines': 'ph', 'Poland': 'pl', 'Portugal': 'pt', 'Qatar': 'qa', 'Romania': 'ro', 'Russia': 'ru', 'Rwanda': 'rw', 'St. Kitts and Nevis': 'in', 'St. Lucia': 'in', 'St. Vincent and the Grenadines': 'in', 'Samoa': 'ws', 'San Marino': 'sm', 'Sao Tome and Principe': 'st', 'Saudi Arabia': 'sa', 'Senegal': 'sn', 'Serbia': 'rs', 'Seychelles': 'sc', 'Sierra Leone': 'sl', 'Singapore': 'sg', 'Slovak Republic': 'in', 'Slovenia': 'si', 'Solomon Islands': 'sb', 'Somalia': 'so', 'South Africa': 'za', 'Spain': 'es', 'Sri Lanka': 'lk', 'Sudan': 'sd', 'Suriname': 'sr', 'Swaziland': 'in', 'Sweden': 'se', 'Switzerland': 'ch', 'Syria': 'sy', 'Taiwan': 'tw', 'Tajikistan': 'tj', 'Tanzania': 'tz', 'Thailand': 'th', 'Timor-Leste': 'tl', 'Togo': 'tg', 'Tonga': 'to', 'Trinidad and Tobago': 'tt', 'Tunisia': 'tn', 'Turkey': 'tr', 'Turkmenistan': 'tm', 'Tuvalu': 'tv', 'Uganda': 'ug', 'Ukraine': 'ua', 'United Arab Emirates': 'ae', 'United Kingdom': 'gb', 'United States': 'us', 'Uruguay': 'uy', 'Uzbekistan': 'uz', 'Vanuatu': 'vu', 'Venezuela': 've', 'Palestine': 'in', 'Vietnam': 'vn', 'Yemen': 'ye', 'Zambia': 'zm', 'Zimbabwe': 'zw', 'South Sudan': 'ss' }
var country_to_geo_data = {}
var selected = []
var lines = {}
var circle = {}
var label = {}
flags = {}

var toggle = true
var color = { 'East Asia & Pacific': 'red', 'Europe & Central Asia': 'blue', 'Latin America & Caribbean': 'green', 'Middle East & North Africa': 'black', 'North America': 'yellow', 'South Asia': 'pink', 'Sub-Saharan Africa': 'violet' }


for (const [key, value] of Object.entries(country_to_geo)) {
    // var myLog = new File('data/'+key+'.csv')
    // if (myLog.exists()){}
    d3.csv('data/' + key + '.csv').then(function (values) {
        // console.log('loaded data');

        values.forEach(element => {
            for (i = 0; i < 10; i++) {
                element[tenAttribute[i]] = +element[tenAttribute[i]];
            }
            element.Year = new Date(+element.Year, 0, 1)
        });

        country_to_geo_data[key] = values
    })
}

function transition(path) {
    path.attrTween("stroke-dasharray", tweenDash);
}

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t) };
}

function transitionCircle(path) {
    path.attrTween("stroke-dasharray", tweenDashCircle);
}

function tweenDashCircle() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t) };
}

var svg = d3.select("#my_dataviz").append("svg")
    .attr("name", "svg")
    .attr("width", 1300)
    .attr("height", 700)

var x = d3.scaleTime()
    .domain([new Date(1980, 0, 1), new Date(2013, 0, 1)])
    .range([100, 1200])

svg.append("g")
    .attr("id", "xAxis")
    .attr("transform", `translate(0, 600)`)
    .call(d3.axisBottom(x));

var y = d3.scaleLinear()
    .domain([])
    .range([600, 100]);

svg.append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(100, 0)")
    .call(d3.axisLeft(y));


function updateChartRegions(obj) {
    var country = region_dict[obj.value]
    var attribute = document.getElementById("attribute_select").value

    if (obj.checked) {
        selected.push(obj.value)

        var minY = Infinity
        var maxY = -Infinity
        for (var i = 0; i < selected.length; ++i) {
            var countries = region_dict[selected[i]]
            for (j = 0; j < countries.length; ++j) {
                if (country_to_geo_data[countries[j]]) {
                    var countries_data = country_to_geo_data[countries[j]];
                    // console.log(countries_data)
                    for (k = 0; k < countries_data.length; ++k) {
                        // console.log(countries_data[k][attribute])
                        maxY = Math.max(maxY, countries_data[k][attribute])
                        minY = Math.min(minY, countries_data[k][attribute])
                    }
                }
            }
        }

        // console.log(minY, maxY)

        y.domain([minY, maxY])
        d3.select("#yAxis")
            .transition()
            .duration(2000)
            .call(d3.axisLeft(y))

        for (const __country of Object.keys(lines)) {
            lines[__country]
                .transition()
                .duration(2000)
                .attr("d", d3.line()
                    .x(d => x(d["Year"]))
                    .y(d => y(d[attribute])))

            circle[__country]
                .transition()
                .duration(2000)
                .attr("cx", x(country_to_geo_data[__country][country_to_geo_data[__country].length - 1]["Year"]))
                .attr("cy", y(country_to_geo_data[__country][country_to_geo_data[__country].length - 1][attribute]))

            if (label[__country])
                label[__country]
                    .transition()
                    .duration(2000)
                    .attr("x", x(country_to_geo_data[__country][country_to_geo_data[__country].length - 1]["Year"]) + 20)
                    .attr("y", y(country_to_geo_data[__country][country_to_geo_data[__country].length - 1][attribute]))
            if (flags[__country])
                flags[__country]
                    .transition()
                    .duration(2000)
                    .attr("x", x(country_to_geo_data[__country][country_to_geo_data[__country].length - 1]["Year"]) + 20)
                    .attr("y", y(country_to_geo_data[__country][country_to_geo_data[__country].length - 1][attribute]))

        }

        for (var i = 0; i < country.length; i++) {
            if (country_to_geo_data[country[i]]) {
                lines[country[i]] = svg.append("path")
                    .datum(country_to_geo_data[country[i]])
                    .attr("fill", "None")
                    .attr("stroke", color[obj.value])
                    .attr("stroke-width", 2.5)
                    .attr("d", d3.line()
                        .x(function (d) { return x(d.Year); })
                        .y(function (d) { return y(d[attribute]); })
                    )

                    .style("opacity", 0)
                    .on('mouseover', function (event, d) {
                        for (const [country, _] of Object.entries(lines)) {
                            lines[country].style("opacity", 0.1)
                            circle[country].style("opacity", 0.1)
                            if (label[country]) label[country].style("opacity", 0.1)
                            if (flags[country]) flags[country].style("opacity", 0.1)
                        }
                        d3.select(this).style('opacity', 1);
                        circle[d[0]["Country"]].style('opacity', 1);
                        if (label[d[0]["Country"]]) label[d[0]["Country"]].style('opacity', 1);
                        if (flags[d[0]["Country"]]) flags[d[0]["Country"]].style('opacity', 1);
                    })
                    .on('mouseout', function (event, d) {
                        for (const [country, _] of Object.entries(lines)) {
                            lines[country].style("opacity", document.getElementById("range1").value / 100)
                            circle[country].style("opacity", document.getElementById("range1").value / 100)
                            if (label[country]) label[country].style("opacity", document.getElementById("range1").value / 100)
                            if (flags[country]) flags[country].style("opacity", document.getElementById("range1").value / 100)
                        }

                    });


                lines[country[i]]
                    .transition()
                    .duration(2000)
                    .style("opacity", document.getElementById("range1").value / 100)


                circle[country[i]] = svg.append("circle")
                    .attr("cx", x(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1].Year))
                    .attr("cy", y(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1][attribute]))
                    .attr("r", "6").style("fill", color[obj.value])
                    .style("opacity", 0)

                circle[country[i]]
                    .transition()
                    .duration(2000)
                    .style("opacity", document.getElementById("range1").value / 100)

                if (toggle)
                    label[country[i]] = svg.append("text").text(country[i])
                        .attr("x", x(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1].Year) + 20)
                        .attr("y", y(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1][attribute]))
                        .style("fill", color[obj.value])
                        .style("opacity", 0)

                if (label[country[i]]) {
                    label[country[i]]
                        .transition()
                        .duration(2000)
                        .style("opacity", document.getElementById("range1").value / 100)
                }

                if (!toggle)
                    flags[country[i]] = svg.append("image")
                        .attr("href", "http://flags.fmcdn.net/data/flags/w580/" + flag_code[country[i]] + ".png")
                        .attr("x", x(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1].Year) + 20)
                        .attr("y", y(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1][attribute]))
                        .attr("width", "20")
                        .attr("height", "20");

                if (flags[country[i]]) {
                    flags[country[i]]
                        .transition()
                        .duration(2000)
                        .attr("x", x(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1].Year) + 10)
                        .attr("y", y(country_to_geo_data[country[i]][country_to_geo_data[country[i]].length - 1][attribute]))

                }



            }
        }
    } else {
        console.log(selected)
        selected.splice(selected.indexOf(obj.value), 1)
        console.log(selected)
        var minY = Infinity
        var maxY = -Infinity
        for (i = 0; i < selected.length; ++i) {
            var countries = region_dict[selected[i]]
            for (j = 0; j < countries.length; ++j) {
                if (country_to_geo_data[countries[j]]) {
                    var countries_data = country_to_geo_data[countries[j]];
                    for (k = 0; k < countries_data.length; ++k) {
                        maxY = Math.max(maxY, countries_data[k][attribute])
                        minY = Math.min(minY, countries_data[k][attribute])
                    }
                }
            }
        }

        y.domain([minY, maxY])
        d3.select("#yAxis")
            .transition()
            .duration(2000)
            .call(d3.axisLeft(y))

        for (var i = 0; i < country.length; i++) {
            if (country_to_geo_data[country[i]]) {
                // var temp_lines = lines[country[i]]
                // var temp_circle = circle[country[i]]
                // var temp_label = label[country[i]]
                // var temp_flag = flags[country[i]]

                lines[country[i]].transition().duration(2000).style("opacity", 0).on("end", () =>
                lines[country[i]].remove(),
                delete lines[country[i]])
                
                circle[country[i]].transition().duration(2000).style("opacity", 0).on("end", () =>
                circle[country[i]].remove(),
                delete circle[country[i]])
                
                if (label[country[i]]) {
                    label[country[i]].transition().duration(2000).style("opacity", 0).on("end", () =>
                    label[country[i]].remove(),
                    delete label[country[i]])
                }
                if (flags[country[i]]) {
                    flags[country[i]].transition().duration(2000).style("opacity", 0).on("end", () =>
                    flags[country[i]].remove(),
                    delete flags[country[i]])
                    
                }
            }
        }

        console.log(lines)

        for ([remainingCountry, _] of Object.entries(lines)) {
            lines[remainingCountry]
                .transition()
                .duration(2000)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.Year); })
                    .y(function (d) { return y(d[attribute]); })
                )

            circle[remainingCountry]
                .transition()
                .duration(2000)
                .attr("cx", x(country_to_geo_data[remainingCountry][country_to_geo_data[remainingCountry].length - 1].Year))
                .attr("cy", y(country_to_geo_data[remainingCountry][country_to_geo_data[remainingCountry].length - 1][attribute]))

            if (label[remainingCountry])
                label[remainingCountry]
                    .transition()
                    .duration(2000)
                    .attr("x", x(country_to_geo_data[remainingCountry][country_to_geo_data[remainingCountry].length - 1].Year) + 10)
                    .attr("y", y(country_to_geo_data[remainingCountry][country_to_geo_data[remainingCountry].length - 1][attribute]))

            if (flags[remainingCountry])
                flags[remainingCountry]
                    .transition()
                    .duration(2000)
                    .attr("x", x(country_to_geo_data[remainingCountry][country_to_geo_data[remainingCountry].length - 1].Year) + 10)
                    .attr("y", y(country_to_geo_data[remainingCountry][country_to_geo_data[remainingCountry].length - 1][attribute]))

        }
    }
}

function opacitySlider() {
    var opacityVal = +document.getElementById('range1').value
    console.log(opacityVal / 100)
    for (const [country, _] of Object.entries(lines)) {
        console.log(country)
        lines[country].style("opacity", opacityVal / 100)
        label[country].style("opacity", opacityVal / 100)
        if (circle[country]) circle[country].style("opacity", opacityVal / 100)
        if (flags[country]) flags[country].style("opacity", opacityVal / 100)
    }
}


function flagToggle() {
    // console.log(label)
    toggle = false
    var attribute = document.getElementById("attribute_select").value
    for (const [country, _] of Object.entries(label)) {
        label[country].remove()
        delete label[country]
        // console.log(country)
        flags[country] = svg.append("image")
            .attr("href", "http://flags.fmcdn.net/data/flags/w580/" + flag_code[country] + ".png")
            .attr("x", x(country_to_geo_data[country][country_to_geo_data[country].length - 1].Year) + 20)
            .attr("y", y(country_to_geo_data[country][country_to_geo_data[country].length - 1][attribute]))
            .attr("width", "20")
            .attr("height", "20");
    }

}

function labelToggle() {
    // console.log(label)
    var attribute = document.getElementById("attribute_select").value
    for (const [country, _] of Object.entries(lines)) {
        if (flags[country]) {
            flags[country].remove()
            delete flags[country]
        }
        // console.log(country)
        label[country] = svg.append("text")
            .text(country)
            .attr("x", x(country_to_geo_data[country][country_to_geo_data[country].length - 1].Year) + 20)
            .attr("y", y(country_to_geo_data[country][country_to_geo_data[country].length - 1][attribute]))
            .style("fill", color[country])
    }

}

function animation() {
    // console.log("here")
    for (const [country, _] of Object.entries(lines)) {
        // console.log(lines[country])
        var totalLength = lines[country].node().getTotalLength()
        // console.log(totalLength)
        lines[country]
            .transition()
            .duration(2000)
            .ease(d3.easeSin)
            .call(transition);

        var totalLengthCircle = circle[country].node().getPointAtLength(totalLength)
        // console.log(totalLengthCircle)
        circle[country]
            .transition()
            .duration(2000)
            .ease(d3.easeSin)
            .attr("cx", x(totalLengthCircle[0]))
            .attr("cy", y(totalLengthCircle[1]))

        // label[country]
        // .transition()
        // .duration(1000)
        // .ease(d3.easeSin)
        // .attr("transform", function(d) { 
        // return "translate(" + (600) +", " + y(d[country][country_to_geo_data[country.length-2]]) + ")";
        // });

    }
}

function updateChartAttribute(obj) {
    var attribute = obj.value

    var maxY = -Infinity
    var minY = Infinity

    for (var i = 0; i < selected.length; ++i) {
        var countries = region_dict[selected[i]]
        for (j = 0; j < countries.length; ++j) {
            if (country_to_geo_data[countries[j]]) {
                var countries_data = country_to_geo_data[countries[j]];
                for (k = 0; k < countries_data.length; ++k) {
                    maxY = Math.max(maxY, countries_data[k][attribute])
                    minY = Math.min(minY, countries_data[k][attribute])
                }
            }
        }
    }

    y.domain([minY, maxY])
    d3.select("#yAxis")
        .transition()
        .duration(2000)
        .call(d3.axisLeft(y))

    for (const country of Object.keys(lines)) {
        console.log(country)
        console.log(lines)
        lines[country]
            .transition()
            .duration(2000)
            .attr("d", d3.line()
                .x(d => x(d["Year"]))
                .y(d => y(d[attribute])))

        circle[country]
            .transition()
            .duration(2000)
            .attr("cx", x(country_to_geo_data[country][country_to_geo_data[country].length - 1]["Year"]))
            .attr("cy", y(country_to_geo_data[country][country_to_geo_data[country].length - 1][attribute]))

        if (label[country])
            label[country]
                .transition()
                .duration(2000)
                .attr("x", x(country_to_geo_data[country][country_to_geo_data[country].length - 1]["Year"]))
                .attr("y", y(country_to_geo_data[country][country_to_geo_data[country].length - 1][attribute]))

        if (flags[country])
            flags[country]
                .transition()
                .duration(2000)
                .attr("x", x(country_to_geo_data[country][country_to_geo_data[country].length - 1]["Year"]))
                .attr("y", y(country_to_geo_data[country][country_to_geo_data[country].length - 1][attribute]))
    }
}

function plotAll() {
    document.getElementById('EastAsiaPacific').checked = true
    document.getElementById('LatinAmericaCaribbean').checked = true
    document.getElementById('EuropeCentralAsia').checked = true
    document.getElementById('MiddleEastNorthAfrica').checked = true
    document.getElementById('NorthAmerica').checked = true
    document.getElementById('SouthAsia').checked = true
    document.getElementById('SubSaharanAfrica').checked = true

    var regions = Object.keys(region_dict)
    for (var i = 0; i < regions.length; i++) {
        if (!(selected.includes(regions[i]))) {
            var obj = { "value": regions[i], "checked": true }
            updateChartRegions(obj)
            console.log("Await done")
        }
    }
}

function removeAll() {
    document.getElementById('EastAsiaPacific').checked = false
    document.getElementById('LatinAmericaCaribbean').checked = false
    document.getElementById('EuropeCentralAsia').checked = false
    document.getElementById('MiddleEastNorthAfrica').checked = false
    document.getElementById('NorthAmerica').checked = false
    document.getElementById('SouthAsia').checked = false
    document.getElementById('SubSaharanAfrica').checked = false

    selected = []

    for (const [country, _] of Object.entries(lines)) {
        if (country_to_geo_data[country]) {
            lines[country].remove()
            delete lines[country]
            circle[country].remove()
            delete circle[country]
            if (label[country]) {
                label[country].remove()
                delete label[country]
            }
            if (flags[country]) {
                flags[country].remove()
                delete flags[country]
            }
        }
    }

    console.log(lines)

}

function changeStart() {
    console.log(document.getElementById("startyear"))
    x.domain([new Date(+document.getElementById("startyear").value, 0, 1), new Date(2013, 0, 1)])
    d3.select("#xAxis").call(d3.axisBottom(x))

}