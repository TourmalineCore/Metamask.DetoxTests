'use strict';
import { exec } from 'child_process';
import TestHelpers from '../helpers';
import OnboardingView from '../pages/Onboarding/OnboardingView';
import OnboardingCarouselView from '../pages/Onboarding/OnboardingCarouselView';
import OnboardingWizardModal from '../pages/modals/OnboardingWizardModal';
import ImportWalletView from '../pages/Onboarding/ImportWalletView';
import MetaMetricsOptIn from '../pages/Onboarding/MetaMetricsOptInView';
import ConnectModal from '../pages/modals/ConnectModal';
import NetworkListModal from '../pages/modals/NetworkListModal';
import NetworkEducationModal from '../pages/modals/NetworkEducationModal';
import WalletView from '../pages/WalletView';

const SECRET_RECOVERY_PHRASE =
  'green bike caught dragon medal wild region jaguar unusual sleep exile debate';
const PASSWORD = `12345678`;
const RINKEBY = 'Rinkeby Test Network';

const QR_SCANNER_ICON = 'open-qr-scanner';
const ACCOUNT_APPROVAL_MODAL = 'account-approval-modal';
const SIGNATURE_MODAL = 'signature-modal';
const SIGNATURE_CONFIRM_BUTTON = 'request-signature-confirm-button';
const TRANSACTION_MODAL = 'txn-confirm-screen';
const TRANSACTION_CONFIRM_BUTTON = 'txn-confirm-send-button';

describe('Wallet Tests', () => {
  beforeAll(() => {
    exec('./scripts/kill.sh');
  })

  beforeEach(() => {
    jest.setTimeout(200000);
  });

  afterAll(() => {
    exec('./scripts/kill.sh');
  })

  it('should tap on import seed phrase button', async () => {
    exec('./scripts/prepare-services.sh');

    exec('./scripts/scan-qr-code.sh');

    await OnboardingCarouselView.isVisible();
    await OnboardingCarouselView.tapOnGetStartedButton();

    await OnboardingView.isVisible();
    await OnboardingView.tapImportWalletFromSeedPhrase();

    await MetaMetricsOptIn.isVisible();
    await MetaMetricsOptIn.tapAgreeButton();

    await ImportWalletView.isVisible();
  });

  it('should import wallet with secret recovery phrase', async () => {
    await ImportWalletView.clearSecretRecoveryPhraseInputBox();
    await ImportWalletView.enterSecretRecoveryPhrase(SECRET_RECOVERY_PHRASE);
    await ImportWalletView.enterPassword(PASSWORD);
    await ImportWalletView.reEnterPassword(PASSWORD);
  });

  it('should dismiss the onboarding wizard', async () => {
    // dealing with flakiness on bitrise.
    await TestHelpers.delay(1000); 
    try {
      await OnboardingWizardModal.isVisible();
      await OnboardingWizardModal.tapNoThanksButton();
      await OnboardingWizardModal.isNotVisible();
    } catch {
        //
    }
  });

  it('change network', async () => {
    await WalletView.tapNetworksButtonOnNavBar();

    await NetworkListModal.isVisible();
    await NetworkListModal.changeNetwork(RINKEBY);
  
    await NetworkEducationModal.isVisible();
    await NetworkEducationModal.isNetworkNameCorrect('Rinkeby Testnet');

    await TestHelpers.delay(3000); 

    await NetworkEducationModal.isVisible();
    await NetworkEducationModal.tapGotItButton();
    await NetworkEducationModal.isNotVisible();
  });

  it('scan qr code and get session', async () => {
    await TestHelpers.tap(QR_SCANNER_ICON);
    await TestHelpers.checkIfVisible(ACCOUNT_APPROVAL_MODAL);
    await ConnectModal.isVisible();
    await ConnectModal.tapConnectButton();
  });

  it('confirm and sign transactions, created by api tests', async () => {

    TestHelpers.delay(5000);
    exec('./scripts/start-api.sh');

    // 1st of 5 transactions
    await TestHelpers.checkIfVisible(TRANSACTION_MODAL);
    await TestHelpers.waitAndTapByText(TRANSACTION_CONFIRM_BUTTON, 50000);

    // 2nd of 5 transactions
    await TestHelpers.checkIfVisible(SIGNATURE_MODAL);
    await TestHelpers.swipe(SIGNATURE_MODAL, 'up', 'fast');
    await TestHelpers.waitAndTap(SIGNATURE_CONFIRM_BUTTON);

  // 3rd of 5 transactions
    await TestHelpers.checkIfVisible(SIGNATURE_MODAL);
    await TestHelpers.swipe(SIGNATURE_MODAL, 'up', 'fast');
    await TestHelpers.waitAndTap(SIGNATURE_CONFIRM_BUTTON);

  // 4th of 5 transactions
    await TestHelpers.checkIfVisible(SIGNATURE_MODAL);
    await TestHelpers.swipe(SIGNATURE_MODAL, 'up', 'fast');
    await TestHelpers.waitAndTap(SIGNATURE_CONFIRM_BUTTON);

  // 5th last transactions
  await TestHelpers.checkIfVisible(TRANSACTION_MODAL);
    await TestHelpers.waitAndTapByText(TRANSACTION_CONFIRM_BUTTON, 50000);
  });
});
