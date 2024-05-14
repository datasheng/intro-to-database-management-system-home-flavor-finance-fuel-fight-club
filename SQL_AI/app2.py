from flask import Flask, request, jsonify, render_template
import mysql.connector
import google.generativeai as genai

app = Flask(__name__)

# Configure Genai Key
genai.configure(api_key="AIzaSyCvXRggpO2yNwIpZmoMy_5Xhm2bDyD-pOo")

# Function to load Google Gemini Model and provide queries as response
def get_gemini_response(question, prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt[0], question])
    return response.text

# Function to connnect to mysql database and run sql queries
def read_sql_query(sql, db):
    conn = mysql.connector.connect(
        host="db-csc-336.cd68y0a605xf.us-east-2.rds.amazonaws.com",
        user="adminsOnly",
        password="blahblah4",
        database=db,
        port=3306
    )
    cur = conn.cursor()
    cur.execute(sql)
    rows = cur.fetchall()
    conn.commit()
    conn.close()

    formatted_rows = [str(row) for row in rows]
    formatted_result = '\n'.join(formatted_rows)

    return formatted_result


# Prompt for Gemini Model to have context and an idea as to how SQL queries might work in the context of our database
prompt = [
    """
    You are an expert in converting English questions to SQL query!
    The SQL database has multiple tables: booking, address, customer, provider, service, class, and payment info. 
    One SQL command will be something like this SELECT COUNT(*) FROM address ;
    \nExample 2 - Tell me what records are in the booking table? so the SQL command would be something like SELECT * FROM booking;
    \nExample 3 - Tell me what records are in the service table where the service type is home flavors? so the SQL command would be something like SELECT * FROM service WHERE service_type = 'home flavors';
    also the sql code should not have ``` in beginning or end and sql word in output
    """
]

# Function that turns english into sql queries and executes them
@app.route('/query', methods=['POST'])
def query():
    data = request.json
    question = data['question']
    response = get_gemini_response(question, prompt)
    sql_query = response
    result = read_sql_query(sql_query, "db_project")
    return jsonify({'sql_query': sql_query, 'response': result})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
