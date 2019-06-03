$( document ).ready(function() {
    // update tooltips
    $('.tooltipped').tooltip({enterDelay: 500});

    // update the server list once
    update_servers();

    // start a timer to update the server list
    setInterval(function() {
        // method to be executed;
        $('.tooltipped').tooltip('destroy');
        update_servers()
    }, 5000);
});

function update_servers(){
    /*
    * Update servers from the internal api using ajax
    * */
    $.get("/api/servers", function(data, status){
        document.getElementById("server-list").innerHTML = build_server_list(data);
        // update feather icons
        feather.replace();
        // update tooltips
        $('.tooltipped').tooltip({enterDelay: 500});
    });
}

function format_server_data(servers){
    /*
    * Ensure the data is useable, even if the server is down
    * */
    for (let server in servers){
        if (servers.hasOwnProperty(server) && servers[server] == null) {
            servers[server] = {'status': 'DOWN', 'name': 'Undefined', 'players': '?', 'max_players': '?'}
        }else{
            // set the server status to true
            servers[server]['status'] = 'UP'
        }
    }
    return servers
}

function build_server_list_element(server){
    /*
    * Returns a single list element
    * */
    let html = [];
    html.push(
        '<li class="collection-item row">',
            '<div class="col s1">',
                '<p>'+server["status"]+'</p>',
            '</div>',
            '<div class="col s9">',
                '<p>'+server["name"]+'</p>',
            '</div>',
            '<div class="col s1">',
                '<p>'+server["players"]+' / '+server["max_players"]+'</p>',
            '</div>',
            '<div class="col s1">',
                '<p>'+Math.round(server["_ping"])+'</p>',
            '</div>',
        '</li>'
    );
    return html.join('')
}

function build_server_list(servers){
    /*
    * Returns html contaning the list of servers
    * */
    servers = format_server_data(servers);
    let server_list = [];
    server_list.push(
        '<ul class="collection with-header">',
            '<li class="collection-header">',
                '<div class="row">',
                    '<h5>Server List</h5>',
                '</div>',
                '<div class="row">',
                    '<div class="col s1">',
                        '<b>Status</b>',
                    '</div>',
                    '<div class="col s9">',
                        '<b>Name</b>',
                    '</div>',
                    '<div class="col s1">',
                        '<b>Players</b>',
                    '</div>',
                    '<div class="col s1">',
                        '<b>Ping</b>',
                    '</div>',
                '</div>',
            '</li>',
    );
    for (let server in servers) {
        if (servers.hasOwnProperty(server)){
            server_list.push(build_server_list_element(servers[server]))
        }
    }
    server_list.push('</ul>');
    return server_list.join('')
}
