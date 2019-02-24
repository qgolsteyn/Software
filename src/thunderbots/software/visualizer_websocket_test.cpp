#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/connect.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <cstdlib>
#include <iostream>
#include <string>

namespace beast = boost::beast;         // from <boost/beast.hpp>
namespace http = beast::http;           // from <boost/beast/http.hpp>
namespace websocket = beast::websocket; // from <boost/beast/websocket.hpp>
namespace net = boost::asio;            // from <boost/asio.hpp>
using tcp = boost::asio::ip::tcp;       // from <boost/asio/ip/tcp.hpp>

// Sends a WebSocket message and prints the response
// PLEASE NOTE: We're using boost 1.65.1, not 1.66, and correspondingly we're using
// the version of beast _before_ it was merged into boost in version 1.66. As such,
// do not be suprised if some things do not work as per the tutorials.
// In particular, see the following link for names that changed in boost networking
// between version 1.65.1 and 1.66:
// https://www.boost.org/doc/libs/1_66_0/doc/html/boost_asio/net_ts.html
int main(int argc, char** argv)
{
    try
    {
        // Check command line arguments.
        if(argc != 3)
        {
            std::cerr <<
                      "Usage: websocket-client-sync <host> <port> \n" <<
                      "Example:\n" <<
                      "    websocket-client-sync echo.websocket.org 80 \"Hello, world!\"\n";
            return EXIT_FAILURE;
        }
        auto const host = argv[1];
        auto const port = argv[2];

        // The io_context is required for all I/O
        net::io_service ioc;

        // These objects perform our I/O
        tcp::resolver resolver{ioc};
        websocket::stream<tcp::socket> ws{ioc};

        // Look up the domain name
        tcp::resolver::query query(host, port);
        auto const results = resolver.resolve(query);

        // Make the connection on the IP address we get from a lookup
        net::connect(ws.next_layer(), results);

        // TODO: this? if we need it?
        // Set a decorator to change the User-Agent of the handshake
        //ws.set_option(websocket::stream_base::decorator(
        //        [](websocket::request_type& req)
        //        {
        //            req.set(http::field::user_agent,
        //                    std::string(BOOST_BEAST_VERSION_STRING) +
        //                    " websocket-client-coro");
        //        }));

        // Perform the websocket handshake
        ws.handshake(host, "/");

        // Send the message
        std::vector<int32_t> data = {1, 2, 3, 4};
        ws.write(net::buffer(data));

        // Close the WebSocket connection
        ws.close(websocket::close_code::normal);

        // If we get here then the connection is closed gracefully
    }
    catch(std::exception const& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}

