/**
 * Created by Ssoele on 26/11/2015.
 */
$(document).ready(function() {
    $('.zg-btn-make').click(function() {
        if(!isEmpty($('#zg-input-x').val()) && !isEmpty($('#zg-input-y').val())) {
            var x = $('#zg-input-x').val();
            var y = $('#zg-input-y').val();
            $('#zg-table').empty();
            for(var i = 0; i < y; i++) {
                $('#zg-table').append('<tr data-y="'+i+'" id="zg-table-y-'+i+'"></tr>');
                for(var j = 0; j < x; j++) {
                    $('#zg-table-y-'+i).append('<td data-x="'+j+'" data-y="'+i+'" id="zg-table-x-'+j+'-y-'+i+'"></td>');
                }
            }
        } else {
            console.warn("Please fill in numbers!");
            alert("Please fill in numbers!");
        }
    });
    $('.zg-btn-export').click(function() {
        var exportedGrid = {
            info: {
                version : 0.1,
                x       : 0,
                y       : 0
            },
            grid: []
        };
        var y = 0;
        var x = 0;
        $('#zg-table tr').each(function() {
            y++;
            x = 0;
            var thisRow = [];
            $('td', this).each(function() {
                x++;
                var type;
                if(isNaN($(this).data("type"))) {
                    type = 0;
                } else {
                    type = $(this).data("type");
                }
                var thisCol = {
                    type: type
                };
                if(!isEmpty($(this).data('qr'))) {
                    thisCol.qr = $(this).data('qr');
                }
                thisRow.push(thisCol);
            });
            exportedGrid.grid.push(thisRow);
        });

        exportedGrid.info.x = x;
        exportedGrid.info.y = y;

        $('#zg-output').val(JSON.stringify(exportedGrid));
    });
    $('.zg-btn-import').click(function() {
        var importedData = JSON.parse($('#zg-output').val());
        var x = importedData.info.x;
        var y = importedData.info.y;

        var grid = importedData.grid;

        $('#zg-table').empty();
        for(var i = 0; i < y; i++) {
            $('#zg-table').append('<tr data-y="'+i+'" id="zg-table-y-'+i+'"></tr>');
            for(var j = 0; j < x; j++) {
                $('#zg-table-y-'+i).append('<td data-x="'+j+'" data-y="'+i+'" id="zg-table-x-'+j+'-y-'+i+'" class="zg-table-type-'+grid[i][j].type+'" data-type="'+grid[i][j].type+'" data-qr="'+grid[i][j].qr+'"></td>');
            }
        }
    });
    $(document).on("click", "#zg-table td", function() {
        var type;
        if(isNaN($(this).data("type"))) {
            type = 0;
        } else {
            type = $(this).data("type");
        }
        if(type == 3 && isEmpty($(this).data('qr'))) {
            $(this).data('qr', prompt("Please fill in the value of the QR code", ""));
        } else {
            type = (type+1)%4;
            $(this).data('qr', '');
            $(this).data('type', type);
            $(this).removeClass('zg-table-type-0 zg-table-type-1 zg-table-type-2 zg-table-type-3').addClass('zg-table-type-'+type);
        }
    });
});

function isEmpty(input) {
    if(!isNaN(input) && input) {
        return false;
    } else {
        return true;
    }
}