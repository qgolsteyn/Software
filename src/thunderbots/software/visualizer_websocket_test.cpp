// PLEASE NOTE: We're using boost 1.65.1, not 1.66, and correspondingly we're using
// the version of beast _before_ it was merged into boost in version 1.66. As such,
// do not be suprised if some things do not work as per the tutorials.
// In particular, see the following link for names that changed in boost networking
// between version 1.65.1 and 1.66:
// https://www.boost.org/doc/libs/1_66_0/doc/html/boost_asio/net_ts.html

//
// Copyright (c) 2016-2017 Vinnie Falco (vinnie dot falco at gmail dot com)
//
// Distributed under the Boost Software License, Version 1.0. (See accompanying
// file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)
//
// Official repository: https://github.com/boostorg/beast
//

//------------------------------------------------------------------------------
//
// Example: WebSocket server, synchronous
//
//------------------------------------------------------------------------------

#include <boost/beast/core.hpp>
#include <boost/beast/websocket.hpp>
#include <boost/asio/ip/tcp.hpp>
#include <cstdlib>
#include <functional>
#include <iostream>
#include <string>
#include <thread>
#include <chrono>

using tcp = boost::asio::ip::tcp;               // from <boost/asio/ip/tcp.hpp>
namespace websocket = boost::beast::websocket;  // from <boost/beast/websocket.hpp>

//------------------------------------------------------------------------------

// Echoes back all received WebSocket messages
void
do_session(tcp::socket& socket)
{
    try
    {
        // Construct the stream by moving in the socket
        websocket::stream<tcp::socket> ws{std::move(socket)};

        ws.binary(true);

        // Accept the websocket handshake
        ws.accept();

        for(;;)
        {
            // Spam messages
            std::vector<int32_t> const contents = {1, 2, 3, 4};

            ws.write(boost::asio::buffer(contents));

            std::this_thread::sleep_for(std::chrono::milliseconds(100));


            //// This buffer will hold the incoming message
            //boost::beast::multi_buffer buffer;

            //// Read a message
            //ws.read(buffer);

            //buffer = {1, 2, 3, 4};

            //// Echo the message back
            //ws.text(ws.got_text());
            //ws.write(buffer.data());
        }
    }
    catch(boost::system::system_error const& se)
    {
        // This indicates that the session was closed
        if(se.code() != websocket::error::closed)
            std::cerr << "Error: " << se.code().message() << std::endl;
    }
    catch(std::exception const& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
    }
}

//------------------------------------------------------------------------------

int main(int argc, char* argv[])
{
    try
    {
        // Check command line arguments.
        if (argc != 3)
        {
            std::cerr <<
                "Usage: websocket-server-sync <address> <port>\n" <<
                "Example:\n" <<
                "    websocket-server-sync 0.0.0.0 8080\n";
            return EXIT_FAILURE;
        }
        auto const address = boost::asio::ip::address::from_string(argv[1]);
        auto const port = static_cast<unsigned short>(std::atoi(argv[2]));

        // The io_context is required for all I/O
        boost::asio::io_service ioc{1};

        // The acceptor receives incoming connections
        tcp::acceptor acceptor{ioc, {address, port}};
        for(;;)
        {
            // This will receive the new connection
            tcp::socket socket{ioc};

            // Block until we get a connection
            acceptor.accept(socket);

            // Launch the session, transferring ownership of the socket
            std::thread{std::bind(
                &do_session,
                std::move(socket))}.detach();
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
}

