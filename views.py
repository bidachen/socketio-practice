import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
from FlaskWebProject1 import app


app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

messages = ['first']

@app.route("/")
def index():
    return render_template("index.html",messages=messages)


@socketio.on("submit message")
def chat(data):
    if(len(messages) > 10):
        messages.pop(0)
    messages.append(data["message"])
    emit("messages", messages, broadcast=True)
