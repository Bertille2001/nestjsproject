import 'package:flutter/material.dart';
import 'package:woelab/create-user.dart';

    



class Notif extends StatefulWidget {
  const Notif({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<Notif> {
  // Liste 
  List<Map<String, dynamic>> contacts = [
    {"notif": "John Doe", },
    {"notif": "Jane Smith",},
    {"notif": "Michael Johnson"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Notifications"),
      
        backgroundColor: Colors.black,
        centerTitle: true,
      ),
  
      body: Container(
        color: Colors.white,
        child: ListView.builder(
          itemCount: contacts.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
              leading: Container(
                width: 40,
                height: 40,
                decoration: const BoxDecoration(
                  color: Colors.grey,
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: Icon(
                    Icons.notifications,
                    color: Color.fromARGB(255, 16, 15, 15),
                  ),
                ),
              ),
              title: Text(contacts[index]["notif"]),
             
              // Ajoutez d'autres widgets d'affichage pour chaque contact si nécessaire
            );
          },
        ),
      ),
  
   floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => createpage()));
          },
          tooltip: 'Increment',
           backgroundColor: const Color.fromARGB(255, 10, 10, 10),
          child: const Icon(Icons.add),
   )


    );
  }
}