from flask import redirect, render_template, url_for, request, flash
from . import app, bcrypt, db
from .forms import Login, Register
from .models import User
from flask_login import current_user, login_required, logout_user, login_user

#form_1 = Register()
#form_2 = Register()

@app.route('/', methods=['POST', 'GET'])
def home():
    #print('it is working')
    form = Register()
    form2 = Login()
    if request.method == 'POST' or form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            flash(f'bro the email already exists please choose another email')
            return redirect(url_for('home'))
        email = form.email.data
        hashed_passwaord = bcrypt.generate_password_hash(form.password.data)
        user = User(email=email, password=hashed_passwaord)
        db.session.add(user)
        db.session.commit()
        flash('Registration sucessful')
        return redirect(url_for('home'))
    
    return render_template('index.html', form=form)

@app.route('/buy')
def buy_page():
    form = Register()
    return render_template('buy_page.html', form=form)

@app.route('/gallery')
def gallery_page():
    form = Register()
    return render_template('gallery.html', form=form)

@app.route('/sales')
def sales_page():
    form = Register()
    return render_template('sales_page.html', form=form)


# Authentication routes are below
@app.route('/register', methods=['POST'])
def register():
    pass


@app.route('/login', methods=['POST'])
def login():
    form = Login()
    if request.method == 'POST':
        user = User.query.filter_by(email=request.form['email']).first()
        if user and bcrypt.check_password_hash(user.password, request.form['password']):
            login_user(user)
            flash(f'Welcome back {user.email} ')
            next = request.args.get('next')
            return redirect(url_for('home'))
        elif user and not bcrypt.check_password_hash(user.password, request.form['email']):
            flash(f'Incorrect password pls try again', 'danger')
        elif not user:
            flash(f'User with email {request.form["email"]} dosent exists', 'danger')
    
    return redirect(url_for('home'))


@app.route('/logout')
def logout():
    logout_user()
    flash('log out successful')
    return redirect(url_for('home'))

