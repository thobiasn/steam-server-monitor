$( document ).ready(function() {
    update_servers();
    setInterval(function() {
        // method to be executed;
        update_servers()
    }, 5000);
});

function update_servers(){
    $.get("/api/servers", function(data, status){
        document.getElementById("server-list").innerHTML = build_server_list(data);
    });
}

function format_server_data(servers){
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
    servers = format_server_data(servers);
    let server_list = [];
    server_list.push(
        '<ul class="collection with-header">',
            '<li class="collection-header">',
                '<h5>Server List</h5>',
            '</li>'
    );
    for (let server in servers) {
        if (servers.hasOwnProperty(server)){
            server_list.push(build_server_list_element(servers[server]))
        }
    }
    server_list.push('</ul>');
    return server_list.join('')
}


