import React from 'react';
import { connect } from 'react-redux';

import { setPreference, reset } from './lib/actions';
import Button from './Button';
import FormTable from './Form/Table';
import Header from './Header';

import './Settings.css';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showRealReset: false,
		};
	}

	render() {
		const { dispatch, preferences, onDismiss } = this.props;
		const { showRealReset } = this.state;

		if ( showRealReset ) {
			return <div className="Settings">
				<Header icon="exclamation-triangle" title="Reset Chassis Desktop" />

				<div className="will-reset">
					<p>You're about to reset Chassis Desktop, and will need to run through the installer again.</p>
					<p>This <strong>will</strong> remove all settings from the app, including boxes you've added.</p>
					<p>This <strong>will not</strong> delete any boxes or machines, nor will it uninstall Vagrant or VirtualBox.</p>
				</div>

				<p>
					<Button
						icon="bomb"
						onClick={() => dispatch(reset())}
					>Reset Chassis Desktop</Button>
					<Button
						icon="times-circle"
						onClick={ () => this.setState({ showRealReset: false }) }
					>Cancel</Button>
				</p>
			</div>;
		}

		return <div className="Settings">
			<Header icon="gear" title="Settings">
				<Button
					icon="check"
					light
					shortcut="esc"
					onClick={ onDismiss }
				>Done</Button>
			</Header>

			<FormTable>
				<label>
					<span>Enable keyboard shortcut overlay</span>
					<input
						checked={ preferences.showShortcuts }
						readOnly
						type="checkbox"
						onChange={ e => dispatch( setPreference( 'showShortcuts', e.target.checked ) ) }
					/>
				</label>
			</FormTable>

			<p className="actions">
				<Button
					icon="exclamation-triangle"
					onClick={() => this.setState({ showRealReset: true })}
				>Reset Chassis Desktop</Button>
			</p>
		</div>;
	}
}

export default connect(store => store)(Settings);
