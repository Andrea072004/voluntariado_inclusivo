from firebase_config import db  # Importa el db ya inicializado

def get_all_users():
    users_ref = db.collection('usuarios')
    docs = users_ref.stream()

    users = []
    for doc in docs:
        user = doc.to_dict()
        user['id'] = doc.id
        users.append(user)

    return users
