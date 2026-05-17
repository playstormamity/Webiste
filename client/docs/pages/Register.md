# Register Page

The `Register` page is the primary entry point for new members to join the PlayStorm Esports Club.

## Route
`/register`

## Features
- **Multi-step Form**: A streamlined registration process for collecting student details, game interests, and social handles.
- **Validation**: Real-time validation for Amity email addresses and other required fields.
- **Success State**: Immersive success screen with confetti and a welcome message.
- **Integration**: Connects to the backend to store member data in the database.

## Components Used
- `Layout`: Provides the global structure.
- `ConfettiButton`: Used for the final "Submit" button to celebrate registration.
- `LoadingScreen`: May be triggered during the form submission process.

## Data Collected
- Full Name
- Enrollment Number
- Amity Email
- Discord ID
- Primary & Secondary Games
- Social Media Handles
