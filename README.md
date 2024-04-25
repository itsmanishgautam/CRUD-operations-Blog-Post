### Backend (Django)

1. Install Django and required packages (`pipenv install django djangorestframework django-cors-headers`).
2. Set up Django models (`models.py`).
3. Create serializers (`serializer.py`) for converting data to JSON.
4. Define views (`views.py`) to handle GET and POST requests.
5. Configure URLs (`urls.py`) for API endpoints.
6. Adjust `settings.py` to include `rest_framework`, `corsheaders`, and configure CORS settings.
7. pip install django-cors-headers
8. pip install djangorestframework

### Frontend (React)

1. Create a new React app (`npx create-react-app frontend`).
2. Install Axios (`npm install axios`) for making HTTP requests.
3. Set up components, like `App.js`, to display data.
4. Use Axios to fetch data from the Django backend, typically in `componentDidMount`.
5. Render the fetched data in the React components.



npm install axios
pip install rest_framework
myenv\Scripts\activate
npm start
python manage.py runserver
python -m venv myenv