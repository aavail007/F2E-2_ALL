$(function () {


});
// =========================
_.templateSettings = { //  underscore.js .Template method.
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
};

$("#roomCardRow").on('click', '.room_card', function (e) {
    var target = e.target;
    var targetID = $(target).parents('.room_card').attr('id');
    getRoomDetail(targetID);
});

function getRooms() {
    var roomData;
    var dataLength;
    var defaultRoomCardHtml = _.template($("#roomCardTemplate").html());
    $.ajax({
        url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
        type: 'GET',
        headers: {
            'accepts': 'application/json',
            'Authorization': 'Bearer Ebh6kfTPSrxLyhFxtGL8mcDxG8wIfbiPAe1rsFmoU7L9Qut0wQ0pZ6KQkSd1'
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            roomData = data.items;
            dataLength = data.items.length;

            for (var i = 0; i < dataLength; i++) {
                var roomCardHtml = defaultRoomCardHtml;
                var holidayPrice = roomData[i].holidayPrice;
                var roomID = roomData[i].id;
                var imageUrl = roomData[i].imageUrl;
                var name = roomData[i].name;
                var normalDayPrice = roomData[i].normalDayPrice;
                roomCardHtml = roomCardHtml({
                    roomID: roomID,
                    imageUrl: imageUrl,
                    holidayPrice: holidayPrice,
                    name: name,
                    normalDayPrice: normalDayPrice
                });

                $("#roomCardRow").append(roomCardHtml);

            }
        }
    });
}

function getRoomDetail() {
    var loc = location.href;
    var n1 = loc.length; //地址的总长度
    var n2 = loc.indexOf("="); //取得=号的位置
    var id = decodeURI(loc.substr(n2 + 1, n1 - n2)); //从=号后面的内容
    console.log(id);

    $.ajax({
        url: 'https://challenge.thef2e.com/api/thef2e2019/stage6/room/' + id,
        type: 'GET',
        headers: {
            'accepts': 'application/json',
            'Authorization': 'Bearer Ebh6kfTPSrxLyhFxtGL8mcDxG8wIfbiPAe1rsFmoU7L9Qut0wQ0pZ6KQkSd1'
        },
        dataType: 'json',
        success: function (data) {
            console.log(data.room[0]);
            var detailData = data.room[0];
            var defaultRoomDetailHtml = _.template($("#roomDetailTemplate").html());
            var detailHtml = defaultRoomDetailHtml;
            var imageUrl1 = detailData.imageUrl[0];
            var imageUrl2 = detailData.imageUrl[1];
            var imageUrl3 = detailData.imageUrl[2];
            var name  =detailData.name;
            var checkIn = detailData.checkInAndOut.checkInEarly + ' ~ ' + detailData.checkInAndOut.checkInLate;
            var checkOut = detailData.checkInAndOut.checkOut;
            var description = detailData.description;
            var peopleNumber = detailData.descriptionShort.GuestMin + ' ~ ' + detailData.descriptionShort.GuestMax;
            var footage = detailData.descriptionShort.Footage;
            var privateBath = detailData.descriptionShort['Private-Bath'];
            var Bed;
            if (detailData.descriptionShort.Bed[0] ==='Double') {
                Bed = '雙人床';
            } else {
                Bed = '單人床';
            }
            var holidayPrice = detailData.holidayPrice;
            var normalDayPrice = detailData.normalDayPrice;
            var AirConditioner = detailData.amenities['Air-Conditioner'];
            var Breakfast = detailData.amenities['Breakfast'];
            var ChildFriendly = detailData.amenities['Child-Friendly'];
            var GreatView = detailData.amenities['Great-View'];
            var MiniBar = detailData.amenities['Mini-Bar'];
            var PetFriendly = detailData.amenities['Pet-Friendly'];
            var Refrigerator = detailData.amenities['Refrigerator'];
            var RoomService = detailData.amenities['Room-Service'];
            var SmokeFree = detailData.amenities['Smoke-Free'];
            var Sofa = detailData.amenities['Sofa'];
            var Television = detailData.amenities['Television'];
            var WiFi = detailData.amenities['Wi-Fi'];

            detailHtml = detailHtml({
                checkIn: checkIn,
                checkOut: checkOut,
                description: description,
                peopleNumber: peopleNumber,
                footage: footage,
                privateBath: privateBath,
                Bed:Bed,
                holidayPrice:holidayPrice,
                normalDayPrice:normalDayPrice,
                imageUrl1:imageUrl1,
                imageUrl2:imageUrl2,
                imageUrl3:imageUrl3,
                name:name,
                AirConditioner:AirConditioner,
                Breakfast:Breakfast,
                ChildFriendly:ChildFriendly,
                GreatView:GreatView,
                MiniBar:MiniBar,
                PetFriendly:PetFriendly,
                Refrigerator:Refrigerator,
                RoomService:RoomService,
                SmokeFree:SmokeFree,
                Sofa:Sofa,
                Television:Television,
                WiFi:WiFi

            });

            $("#roomDetail").append(detailHtml);
            $('.device_item[data-boolean=true]').find('.isHave').text('有');
            $('.device_item[data-boolean=false]').find('.isHave').text('無');
            $('.device_item[data-boolean=false]').attr('style','color:#B4AFAA');
            
            $("input.date_picker").daterangepicker({
                locale: {
                    format: "YYYY-MM-DD"
                }
            });
        }
    });
}
