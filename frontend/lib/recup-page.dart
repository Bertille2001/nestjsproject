import 'package:flutter/material.dart';
import 'package:woelab/create-user.dart';
import 'package:woelab/edit.dart';

class UserPage extends StatefulWidget {
  const UserPage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<UserPage> {
  List<Map<String, dynamic>> contacts = [
    {"name": "John Doe", "age": 30},
    {"name": "Jane Smith", "age": 25},
    {"name": "Michael Johnson", "age": 28},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Users"),
        backgroundColor: Colors.black,
        centerTitle: true,
      ),
      body: Container(
        color: Colors.white,
        child: ListView.builder(
          itemCount: contacts.length,
          itemBuilder: (BuildContext context, int index) {
            return InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => EditPage(
                        user: contacts[index],
                        onDelete: () => _handleDelete(index)),
                  ),
                );
              },
              child: ListTile(
                leading: Container(
                  width: 40,
                  height: 40,
                  decoration: const BoxDecoration(
                    color: Colors.grey,
                    shape: BoxShape.circle,
                  ),
                  child: const Center(
                    child: Icon(
                      Icons.person,
                      color: Color.fromARGB(255, 16, 15, 15),
                    ),
                  ),
                ),
                title: Text(contacts[index]["name"]),
                subtitle: Text(" ${contacts[index]["age"]} ans"),
              ),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Naviguer vers la page de modification de profil
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => createpage()),
          );
        },
        backgroundColor: Colors.black,
        child: const Icon(Icons.add),
      ),
    );
  }

  void _handleDelete(int index) {
    setState(() {
      contacts.removeAt(index);
    });
  }
}

class EditPage extends StatelessWidget {
  final Map<String, dynamic> user;
  final VoidCallback? onDelete;

  EditPage({required this.user, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit User'),
        backgroundColor: Colors.black,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Card(
              elevation: 20,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(50),
              ),
              child: Container(
                width: 300,
                height: 300,
                padding: const EdgeInsets.all(20),
                color: Colors.grey[300],
                child: Column(
                  children: [
                    SizedBox(height: 20),
                    const CircleAvatar(
                      radius: 50.0,
                      backgroundColor: Color.fromARGB(255, 199, 197, 197),
                      child:
                          Icon(Icons.person, color: Colors.black, size: 40.0),
                    ),
                    SizedBox(height: 40),
                    Text(
                      'Name: ${user["name"]}',
                      style: TextStyle(fontSize: 16),
                    ),
                    SizedBox(height: 5),
                    Text(
                      'Age: ${user["age"]}',
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 70),
            Center(
              child: Container(
                width: 300,
                child: ElevatedButton(
                  onPressed: () {
                    _showEditConfirmationDialog(context);
                  },
                  style: ElevatedButton.styleFrom(
                       minimumSize: const Size(double.infinity, 49),
                       
                    primary: Colors.black,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(5),
                    ),
                  ),
                  child: const Center(
                    child: Text(
                      'Edit User',
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Center(
              child: Container(
                width: 300,
                child: ElevatedButton(
                  onPressed: () {
                    _showDeleteConfirmationDialog(context);
                  },
                  style: ElevatedButton.styleFrom(
                       minimumSize: const Size(double.infinity, 49),
                    primary: Colors.grey[300],
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(5),
                    ),
                  ),
                  child: const Center(
                    child: Text(
                      'Delete User',
                      style: TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Future<void> _showEditConfirmationDialog(BuildContext context) async {
    final bool shouldEdit = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirmation de modification'),
          content: const Text('voulez vous vraiment modifier?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true); // Confirm edit
              },
              child: const Text('oui'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false); // Cancel edit
              },
              child: const Text('non'),
            ),
          ],
        );
      },
    );

    if (shouldEdit != null && shouldEdit) {
      // Navigate to EditProfilePage
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Edit()),
      );
    }
  }

  Future<void> _showDeleteConfirmationDialog(BuildContext context) async {
    final bool shouldDelete = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirmation de suppression'),
          content: const Text('vous etes sur de supprimer?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true); // Confirm delete
              },
              child: const Text('oui'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false); // Cancel delete
              },
              child: const Text('Non'),
            ),
          ],
        );
      },
    );

    if (shouldDelete != null && shouldDelete) {
      onDelete?.call(); // Supprimer l'utilisateur de la liste
      Navigator.pop(context); // Revenir à la liste des utilisateurs
    }
  }
}

void main() {
  runApp(const MaterialApp(
    home: UserPage(),
  ));
}
