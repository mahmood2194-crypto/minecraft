from flask import Flask
import subprocess
import threading
import os

app = Flask(__name__)

def run_bot():
    subprocess.run(["node", "bot.js"])

@app.route('/')
def hello():
    return "Bot is Online!"

if __name__ == "__main__":
    threading.Thread(target=run_bot).start()
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
