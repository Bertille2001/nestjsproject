// import 'package:flutter/material.dart';

// import 'package:woelab/recup-page.dart';


// class CreatePage extends StatelessWidget {
   


//     final TextEditingController firstNameController = TextEditingController();
//   final TextEditingController lastNameController = TextEditingController();
//   final TextEditingController ageController = TextEditingController();

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         backgroundColor: Colors.black,
//         leading: GestureDetector(
//           onTap: () {
//             Navigator.of(context).pop();
//           },
//           child: const Icon(Icons.arrow_back,
//               color: Color.fromARGB(255, 245, 244, 244)),
//         ),
//         title: const Text('Create user'),
//       ),
//       body: SingleChildScrollView(
//         child: Container(
//           color: Colors.white,
//           padding: const EdgeInsets.all(16.0),
//           child: Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             crossAxisAlignment: CrossAxisAlignment.center,
           
//             children: [
//               const SizedBox(height: 50.0),
//               const CircleAvatar(
//                 radius: 50.0,
//                 backgroundColor: Color.fromARGB(255, 199, 197, 197),
//                 child: Icon(Icons.person, color: Colors.black, size: 40.0),
//               ),
//               const SizedBox(height: 20.0),
//               const TextField(
//                 style: TextStyle(color: Colors.black),
//                 decoration: InputDecoration(
//                   labelText: 'firstname',
//                   labelStyle: TextStyle(color: Colors.black),
//                   border: OutlineInputBorder(),
//                 ),


//               ),
//               const SizedBox(height: 12.0),
              
//               const SizedBox(height: 20.0),
//               const TextField(
//                 style: TextStyle(color: Colors.black),
//                 decoration: InputDecoration(
//                   labelText: 'Age',
//                   labelStyle: TextStyle(color: Colors.black),
//                   border: OutlineInputBorder(),
//                 ),
//                 obscureText: true,
//               ),
//               const SizedBox(height: 20.0),
//               ElevatedButton(
//                 onPressed: () {
//                   // Afficher une boîte de dialogue de confirmation
//                   showDialog(
//                     context: context,
//                     builder: (BuildContext context) {
//                       return AlertDialog(
//                         title: Text('Enregistrer'),
//                         content: Text('Voulez-vous enregistrer les données ?'),
//                         actions: <Widget>[
//                           TextButton(
//                             onPressed: () {
//                               // Fermer la boîte de dialogue
//                               Navigator.of(context).pop();
//                             },
//                             child: Text('Non'),
//                           ),
//                           ElevatedButton(
//                             onPressed: () {
                              
//                               // Naviguer vers la page de profil
//                               Navigator.push(
//                                   context,
//                                   MaterialPageRoute(
//                                       builder: (context) => const UserPage()));
//                             },
//                             style: ElevatedButton.styleFrom(
//                               primary: Colors.black,
//                               onPrimary: Colors.white,
//                             ),
//                             child: Text('Oui'),
//                           ),
//                         ],
//                       );
//                     },
//                   );
//                 },
//                 style: ElevatedButton.styleFrom(
//                   foregroundColor: Colors.white,
//                   backgroundColor: Colors.black,
//                   textStyle: const TextStyle(fontSize: 16),
//                   minimumSize: const Size(double.infinity, 49),
//                 ),
//                 child: const Text('save'),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }











import 'package:flutter/material.dart';
import 'package:woelab/profil-page.dart';
import 'package:woelab/recup-page.dart';


class Edit extends StatelessWidget {
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: GestureDetector(
          onTap: () {
            Navigator.of(context).pop();
          },
          child: const Icon(Icons.arrow_back, color: Color.fromARGB(255, 245, 244, 244)),
        ),
        title: const Text('Edit users'),
      ),
      body: SingleChildScrollView(
        child: Container(
          color: Colors.white,
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 50.0),
              const CircleAvatar(
                radius: 50.0,
                backgroundColor: Color.fromARGB(255, 199, 197, 197),
                child: Icon(Icons.person, color: Colors.black, size: 40.0),
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: firstNameController,
                style: TextStyle(color: Colors.black),
                decoration: InputDecoration(
                  labelText: 'Firstname',
                  labelStyle: TextStyle(color: Colors.black),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12.0),
              TextField(
                controller: lastNameController,
                style: TextStyle(color: Colors.black),
                decoration: InputDecoration(
                  labelText: 'Lastname',
                  labelStyle: TextStyle(color: Colors.black),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20.0),
              TextField(
                controller: ageController,
                style: TextStyle(color: Colors.black),
                decoration: InputDecoration(
                  labelText: 'Age',
                  labelStyle: TextStyle(color: Colors.black),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                onPressed: () {
                  if (firstNameController.text.isEmpty || lastNameController.text.isEmpty || ageController.text.isEmpty) {
                    // Afficher une erreur si un champ est vide
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Erreur'),
                          content: Text('Veuillez remplir tous les champs.'),
                          actions: [
                            ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text('OK'),
                            ),
                          ],
                        );
                      },
                    );
                  } else {
                    // Afficher la boîte de dialogue de confirmation
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Enregistrer'),
                          content: Text('Voulez-vous enregistrer les données ?'),
                          actions: <Widget>[
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text('Non'),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                // Naviguer vers la page de profil
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => const UserPage (),
                                  ),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                primary: Colors.black,
                                onPrimary: Colors.white,
                              ),
                              child: Text('Oui'),
                            ),
                          ],
                        );
                      },
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  foregroundColor: Colors.white,
                  backgroundColor: Colors.black,
                  textStyle: TextStyle(fontSize: 16),
                  minimumSize: const Size(double.infinity, 49),
                ),
                child: const Text('Save change'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
















