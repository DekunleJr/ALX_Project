import mysql.connector
from flask import Flask, render_template, request, redirect, session, flash

app = Flask(__name__)

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root@localhost",
    password="",
    database="login_details"
)

# Create a cursor
cursor = db.cursor()

# Define routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.css')
def css():
    return render_template('index.css')

@app.route('/index.js')
def js():
    return render_template('index.js')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # Validate login credentials
    if not username or not password:
        flash('Please enter both username and password', 'error')
        return redirect('/')

    # Authenticate the user
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    values = (username, password)
    cursor.execute(query, values)
    user = cursor.fetchone()

    if user:
        # Store user information in session
        session['username'] = user[0]
        flash('Login successful', 'success')
        return redirect('/dashboard')
    else:
        flash('Invalid username or password', 'error')
        return redirect('/')

@app.route('/dashboard')
def dashboard():
    # Check if the user is authenticated
    if 'username' in session:
        return render_template('dashboard.html')
    else:
        flash('Please log in to access the dashboard', 'error')
        return redirect('/')

@app.route('/logout')
def logout():
    # Clear the session and log out the user
    session.clear()
    flash('You have been logged out', 'success')
    return redirect('/')


# Sign-up route
@app.route('/signup', methods=['POST'])
def signup():
    # Get user input from the signup form
    email = request.form['email']
    password = request.form['password']

    # Create a cursor object to execute SQL queries
    cursor = db.cursor()

    # Insert user information into the database
    query = "INSERT INTO users (email, password) VALUES (%s, %s)"
    values = (email, password)
    cursor.execute(query, values)

    # Commit the changes to the database
    db.commit()

    # Close the cursor
    cursor.close()

    # Redirect the user to a success page
    return redirect('/success')

# Success route
@app.route('/success')
def success():
    return render_template('success.html')

if __name__ == '__main__':
    app.run()
