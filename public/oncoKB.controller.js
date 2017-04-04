(function () {
    angular
        .module("OncoKB")
        .controller("GeneSearchController", GeneSearchController)
        // .controller("ChartController", ChartController)

    function GeneSearchController($http) {
        var vm = this;
        vm.findVariantById = findVariantById;

        function findAllVariants() {
            var url = "http://oncokb.org/api/v1/variants";
            $http
                .get(url)
                .then(function(result) {
                    renderAllVariant(result);
                }, function (error) {
                    vm.error = "failed getting data";
                });
        }

        function findVariantById(geneId) {
            var url = "http://oncokb.org/api/v1/genes/" + geneId + "/variants";
            $http
                .get(url)
                .then(function(result) {
                    renderVariantDetails(result);
                    renderBarGraph(result);
                }, function (error) {
                    vm.error = "failed getting data";
                });
        }

        function renderVariantDetails(result) {
            vm.variants = result;
        };

        function renderBarGraph(result) {
            var chartData = {};
            for (var i in vm.variants.data.data){
                var record = vm.variants.data.data[i];
                if (chartData.hasOwnProperty(record.consequence.term)){
                    chartData[record.consequence.term] += 1;
                }
                else{
                    chartData[record.consequence.term] = 1;
                }
            }
            var labels = [];
            var data = [];
            for (var key in chartData) {
                labels.push(key);
                data.push(chartData[key]);
            }

            vm.labels = labels;
            vm.data = data;

        }



    }

    
})();
