# ng-percentage-chart

A chart that display the color based on the percentage of values in array.Angular chart module that displays percentage of occurrence in an array

### Installation

```
bower install ng-percentage-chart --save
```

### Usage 

Inject `ng-percentage-chart` to angular module.

Define data array and duration.
```
$scope.data =  [0,1];
$scope.duration = 2;
```

Use directive in HTML to draw the chart
```
<div percentage-circle duration="{{duration}}" data="data" radius="100" stroke="20"></div>
```

0 indicates absence of an item , whereas 1 indicates the presence.
The input to the directive is 
- `duration` - the total occurence
- `data` - individual occurence status
- `stroke` - outer circle stroke
- `radius` - outer circle radius


### Todos

- Unit tests
- Detailed example