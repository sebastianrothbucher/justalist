import unexpectedReact from 'unexpected-react/jest';
import unexpected from 'unexpected';
import React from 'react';
import { ChoiceComponent } from './choice';

const expect = unexpected.clone().use(unexpectedReact);

it("renders basic choices", () => {
  expect(<ChoiceComponent choices={[{value: 'a'}]} />,
    'when rendered',
    'to have rendered',
    <span>
        <span>
            <span></span>
            <span></span>
            <ul>
                <li>a</li>
            </ul>
      </span>
    </span>
  );
});