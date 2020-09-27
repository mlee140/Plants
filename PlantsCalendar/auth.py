from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from .db import user_info

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = user_info.search('Username', username)
    stored_password = user[0]['fields']['Password']

    if not user or not check_password_hash(stored_password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # if the user doesn't exist or password is wrong, reload the page

    return redirect(url_for('main.profile'))

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():
    username = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    #secure hash alg = sha
    pw_sha = generate_password_hash(password, method='sha256')

    user = user_info.search('Username', username)
    # if user exist
    if user:
        flash('User already exist')
        return redirect(url_for('auth.signup'))
    
    user_info.insert({'Username': username, 'Name': name, 'Password': pw_sha})
    
    # code to validate and add user to database goes here
    return redirect(url_for('auth.login'))

@auth.route('/signout')
def logout():
    return 'signout'