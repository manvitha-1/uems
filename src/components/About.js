import React from "react";
import Home from "./Home";

const About = () => {
  return (
    <div>
      <Home />
      <div className="container-fluid" style={{ paddingTop: "80px" }}>
        <p>
          University Event Management is your one-stop destination for
          organizing and managing events within our esteemed institution.
          Whether you're an administrator overseeing event approvals or an
          organizer planning an event, our platform provides the tools and
          support you need to ensure successful and memorable experiences for
          all.
        </p>
        <br/>
        <b className="ml-3">The Administrators:</b>
        <p>
          As an administrator, you play a crucial role in approving or
          declining event proposals submitted by organizers. Our intuitive
          dashboard provides you with a comprehensive overview of all pending
          event requests, allowing you to review event details, proposed
          budgets, and logistical plans.
          With just a few clicks, you can efficiently evaluate each proposal
          and make informed decisions that align with the university's mission
          and priorities. Whether it's a student-led seminar, a faculty
          conference, or a community outreach initiative, your approval
          ensures that events meet the highest standards of quality and
          relevance.
        </p>
        <br/>
        <b className="ml-3">The Organizers:</b>
        <p>
          Are you passionate about bringing your event ideas to life? As an
          organizer, you have the opportunity to submit event proposals for
          consideration by the university administration. Our user-friendly
          platform guides you through the proposal submission process, prompting
          you to provide essential details such as event objectives, target
          audience, and resource requirements.
          Once your proposal is submitted, you can track its status in
          real-time regarding approval or feedback from administrators. Whether you're planning an academic symposium, a
          cultural showcase, or a sports tournament, our platform empowers you
          to create engaging and impactful events that enrich the university
          community.
        </p>
        <br/>
        <b className="ml-3">Collaboration and Support:</b>
        <p>
          At University Event Management, we foster collaboration between
          administrators and organizers to ensure seamless event planning and
          execution. Our team is dedicated to providing ongoing support and
          guidance throughout the event lifecycle, from initial proposal
          submission to post-event evaluation.
        </p>
        <br/>
        <b className="ml-3">Get Started Today:</b>
        <p>
          Ready to plan your next event? Log in to your account to submit a
          proposal or review pending event requests. If you're an
          administrator, access your dashboard to streamline the approval
          process and ensure compliance with university policies.
        </p>
      </div>
    </div>
  );
};

export default About;
