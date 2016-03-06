/*global _ d3*/
(function() {
  'use strict';

  angular
    .module('usabila')
    .directive('chart', chart);

  /* @ngInject */
  function chart($window) {
    var directive = {
      controller: ChartCtrl,
      link: link,
      restrict: 'A',
      scope: {data: '=chartData'}
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      scope.$watch('data', function(data) {
        if(data) {
          ctrl.createChart(element[0], data);
          $window.addEventListener('resize', function(){
            ctrl.reset(element);
            ctrl.createChart(element[0], data);
          })
        }
      });
    }
  }


  /* @ngInject */
  function ChartCtrl($window) {
    this.reset = function(el){
       el.find('svg').remove();
    };
    this.lineData = function(data, nodes) {
      var min_date = d3.min(data, function(d) {
        return d.creation_date;
      });

      var max_date = d3.max(data, function(d) {
        return d.creation_date;
      });

      var interval = Math.ceil((max_date - min_date) / nodes);

      var iterator = function(next) {
        var temp;
        for(var i = 0; i < nodes; i++) {
          temp = min_date + (i + 1) * interval;
          if(next.creation_date < temp) {
            return i;
          }
        }
      };

      var bins = _.groupBy(data, iterator);
      var lineData = _.map(bins, function(bin) {
        var avgRating;
        var avgDate;
        var totalRating = 0;
        var totalDate = 0;
        var count = bin.length;
        for(var i in bin) {
          totalDate += parseInt(bin[i].creation_date);
          totalRating += parseInt(bin[i].rating);
        }
        avgDate = Math.ceil(totalDate / count);
        avgRating = totalRating / count;
        return {
          avgDate: avgDate,
          avgRating: avgRating
        }
      });

      return lineData;
    };


    this.createChart = function(el, data) {
      var w = el.clientWidth;
      var h = el.clientHeight;
      var margin = {top: 20, right: 10, bottom: 20, left: 30};

      if(!$window.d3) return; // exit if no D3

      var svg = d3.select(el).append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('viewBox', '0 0 ' + w + ' ' + h);

      var min_date = d3.min(data, function(d) {
        return d.creation_date;
      });

      var max_date = d3.max(data, function(d) {
        return d.creation_date;
      });

      var xScale = d3.time.scale()
        .domain([new Date(min_date), new Date(max_date)])
        .range([0, w - margin.left - margin.right]);

      var xAxis = d3.svg.axis()
        .tickSize(0)
        .tickPadding(10)
        .scale(xScale)
        .orient('bottom');

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + margin.left + ',' + (h - margin.bottom) + ')')
        .call(xAxis);


      var yScale = d3.scale.linear()
        .domain([1, 5])
        .range([h - margin.top - margin.bottom, 0]);

      var yAxis = d3.svg.axis()
        .ticks(5)
        .tickSize(-(w - margin.right - margin.left))
        .tickPadding(10)
        .scale(yScale)
        .orient('left');

      svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(yAxis);

      //circle labels
      svg.selectAll('.y.axis g').insert('circle', 'line')
        .attr('r', 10)
        .attr('fill', '#04A0C4')
        .attr('cx', -14)
        .attr('cy', 0);

      //The data for our line
      var lineData = this.lineData(data, 10);
      // Define the line
      var valueline = d3.svg.line()
        .x(function(d) {
          return xScale(new Date(d.avgDate));
        })
        .y(function(d) {
          return yScale(d.avgRating);
        });

      // Add the value line path.
      svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(lineData))
        .attr('transform', 'translate(' + margin.left + ', 0)');

      //append node labels
      svg.selectAll('.node-label')
        .data(lineData)
        .enter().append('circle')
        .attr('class', 'node-label')
        .attr('cx', function(d) {
          return xScale(d.avgDate)
        })
        .attr('cy', function(d) {
          return yScale(d.avgRating)
        })
        .attr('r', 5)
        .attr('transform', 'translate(' + margin.left + ', 0)');

    };
  }

})();


