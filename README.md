Mala Counter App
A devotional mala counter app with a Radha Nila Madhava-inspired tap button, packaged for iPhone using Capacitor.

Repo structure
www/ is the source of truth for the web app used by Capacitor.
ios/ contains the generated native iPhone project.
capacitor.config.json contains the Capacitor app configuration.
Getting started
cd /Users/riteshruparel/Documents/Codex/2026-04-30-code-me-a-mala-counter-app
npm install
iPhone workflow
Sync the latest web files into the iOS project:

npm run sync:ios
Open the iOS project in Xcode:

npm run open:ios
If that does not open automatically, use:

/Users/riteshruparel/Documents/Codex/2026-04-30-code-me-a-mala-counter-app/ios/App/App.xcodeproj

Exporting an .ipa
You need full Xcode plus Apple code signing set up on the Mac you are building from.

Open ios/App/App.xcodeproj in Xcode.
Select the App target.
Set your Apple Developer team in Signing & Capabilities.
Choose Any iOS Device (arm64) as the destination.
Run Product -> Archive.
In Organizer, use Distribute App to export the .ipa.
Notes
Edit app files inside www/.
After web changes, run npm run sync:ios again before building in Xcode.
This repo is organized for GitHub so generated dependency folders like node_modules/ stay out of version control.
GitHub Actions is configured in .github/workflows/main.yml.
Push and pull request runs validate the web app and sync the Capacitor iOS project.
Manual workflow_dispatch runs build an unsigned iOS Simulator app, then upload it as the mala-counter-simulator-app artifact in the Actions run.
GitHub Actions no-sign build
No Apple signing secrets are required for the current workflow.

Open GitHub Actions and run the iOS CI workflow manually. When it completes, download the mala-counter-simulator-app artifact from the run summary.

Important limitation
An actual installable iPhone .ipa still requires Apple code signing. The current workflow avoids signing, so it produces a simulator build artifact instead of a signed .ipa.
