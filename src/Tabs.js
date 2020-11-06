import React from 'react';
import VoterView from './VoterView';
import {Tabs, Tab} from 'react-bootstrap';
import ManagerView from './ManagerView';

export default function ViewTabs() {
  const [key, setKey] = React.useState("voter");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="voter" title="Voter View">
        <VoterView />
      </Tab>
      <Tab eventKey="manager" title="Manager View">
        <ManagerView />
      </Tab>
    </Tabs>
  );
}