#!/usr/bin/env python3
"""
Local Development Server for ÉLÉVATION ATELIER
---------------------------------------------
Automatically opens the fashion website in your default browser
and serves all assets locally with proper MIME types and no-cache headers.
"""

import os
import sys
import webbrowser
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class LuxuryStoreHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable caching during local testing so edits appear immediately
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def open_browser():
    url = f"http://localhost:{PORT}"
    print(f"\n✨ Launching browser at: {url}")
    webbrowser.open(url)

def run():
    os.chdir(DIRECTORY)
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, LuxuryStoreHandler)
    
    print("=" * 60)
    print("  ÉLÉVATION ATELIER - LOCAL TESTING SERVER")
    print("=" * 60)
    print(f"  Serving Directory: {DIRECTORY}")
    print(f"  Local Address:     http://localhost:{PORT}")
    print("  Press Ctrl+C to stop the server anytime.")
    print("=" * 60)

    # Open browser after 0.8 seconds
    timer = threading.Timer(0.8, open_browser)
    timer.daemon = True
    timer.start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nAtelier server gracefully stopped.")
        sys.exit(0)

if __name__ == '__main__':
    run()
