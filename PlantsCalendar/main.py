from flask import Flask, render_template, request, url_for, jsonify, Blueprint

main = Blueprint('main', __name__)

@main.route('/')
def index():
  return render_template('index.html')

@main.route('/profile')
def profile():
  return render_template('profile.html')
  

@main.route('/api/user_plants', methods=['GET'])
# def defines methods in python
def user_plants():
  user = request.args.get('username')
  returned_user_plants = user_plant.search('Username', user)
  plant_names = []

  for returned in returned_user_plants:
    plant_names.append(returned['fields']["Name"])

  plants = []
  for name in plant_names:
    plant = plant_table.search('Name', name)[0]
    plant_map = {}
    plant_map['name'] = name
    plant_map['watering days'] = plant['fields']['Days']
    plants.append(plant_map)
  print(plant_names)
  return jsonify(plants)

if __name__ == "__main__":
  app.run(debug=True)
