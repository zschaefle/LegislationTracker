# LegislationTracker
A program to grab and parse data on government bills

## Getting Started

### Prerequisites

To make use of this program, you will need to install node.js, a JavaScript runtime. It was coded in 12.2.0, so later versions are recommended.
* The latest version of node.js can be found at https://nodejs.org/en/download/current/
* The stable version of node.js can be found at https://nodejs.org/en/download/
After you have downloaded your desired node.js installer, run it and follow the dialogue options. _Make sure that npm is installed along with node_. It will be needed in a later step.

### Downloading
Download this repo like you would any other repository. For those of you who know how to do this, skip to the next section.

#### Quick start
The easiest method, for those that know they will only want one version, is to download this project as a zip. To do so, click the button in the top right of this area labelled **Clone or download** and then **Download zip**. Download the zip file, and extract its contents to your desired location.

#### Git
If you want to download this with git, either use command-line git (download from https://git-scm.com/downloads if you don't have it already) or github desktop (https://desktop.github.com/).

##### Command-Line
Navigate with your terminal to where you want the files to be downloaded, then run the following command.
```
git clone https://github.com/zschaefle/LegilationTracker
```
The project will be downloaded to whatever directory the command line was is when the command was run, just wait for it to finish.

##### Desktop
click the button in the top right of this area labelled **Clone or download**, and then click **Open in Desktop**. Once the desktop app has opened you can select what path the project will be downloaded to by clicking "choose" next to the Local Path field. Once you click **Clone**, GitHub Desktop will download the file to your chosen location.

### Set up

Now that everything is downloaded, all you have to do is run **update.bat**, which will download the node dependancies. If you are not on a windows system (or prefer the command line), you can navigate a command prompt window to the project's directory and run the command `npm install`. This part can take a little bit, so just be patient. If an error occurs at this step, it is because npm was not installed with node.js and you will have to re-run the node.js installer.

### Running

All you have to do now is edit the `bills.txt` file to contain the bills that you want to view. Each bill must be on a separate line, and be in the form `[congress #] [hr/s] [bill number]`. Once all the bills you want to view are inputted, run `run.bat`, or in the command line run `node main.js`. After the program completes, parsed information will be output in the file `output.txt`.

For example, a file reading
```
116 hr 195
```
Will result in the output
```

======================
Data from: http://www.govinfo.gov/bulkdata/BILLSTATUS/116/hr/BILLSTATUS-116hr195.xml
Bill hr195, Pay our Doctors Act of 2019
First presented by Rep. Mullin, Markwayne [R-OK-2]
Summary: Pay our Doctors Act of 201 9 This bill provides FY2019 appropriations to the Indian Health Service (IHS) if a joint resolution making continuing appropriations for FY2019 is not in effect. In the event of a partial government shutdown due to a lapse in appropriations, the bill provides continuing appropriations to the IHS at the same level that was provided for FY2018.  
Assigned to the following committee(s): Appropriations Committee
The Last Action was: Referred to the House Committee on Appropriations.
This action was taken: 2019-01-03
======================

```

The default file contains a couple bills that I was given to test on and one invalid bill at the end to test the fail case.
