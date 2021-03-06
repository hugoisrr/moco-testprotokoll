# MoCo Test-Protokoll - [ILESO GmbH & Co. KG](https://www.ileso.de/)

Full-stack App that saves data from a form into a DB and text files.
## Description

The UI has a form where the user saves the data after performing control protocol of an electronic board. The data is saved through a DB and text files in a drive specified by the user.
<figure>
    <img src="img/Moco-Testprotokoll%20Architecture.jpg" alt="MoCo_Test_Protokoll_Architecture" style="width:100%>
    <figcaption align="center"><b>MoCo-Test Protocol Architecture</b></figcaption>
</figure>

The server process the API end-points, the data is saved within MongoDB and the server also generates a new text of an assignment if one was not created before. The client consumes the API end-points through asynchronous calls to the sever. Both sides validates the data before it is saved within the DB and within the text file. The user through the UI can modify the path where the text files are been saved.
<figure>
    <img src="img/FormValidation.png" alt="Form_Validation_Client" style="width:100%>
    <figcaption align="center"><b>Form Validation - UI</b></figcaption>
</figure>
<figure>
    <img src="img/TestsResults.png" alt="Test_Result" style="width:100%>
    <figcaption align="center"><b>Test Results - UI</b></figcaption>
</figure>

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)