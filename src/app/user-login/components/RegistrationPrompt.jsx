import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function RegistrationPrompt({ translations }) {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-muted-foreground mb-4">
        {translations?.prompt?.newUser}
      </p>
      <Link
        href="/user-registration"
        className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-primary-foreground transition-smooth"
      >
        <Icon name="UserPlusIcon" size={20} />
        <span>{translations?.prompt?.createAccount}</span>
      </Link>
      <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <Link href="/homepage" className="hover:text-primary transition-smooth flex items-center space-x-1">
          <Icon name="HomeIcon" size={16} />
          <span>{translations?.prompt?.backToHome}</span>
        </Link>
        <span>•</span>
        <button className="hover:text-primary transition-smooth flex items-center space-x-1">
          <Icon name="QuestionMarkCircleIcon" size={16} />
          <span>{translations?.prompt?.needHelp}</span>
        </button>
      </div>
    </div>
  );
}

RegistrationPrompt.propTypes = {
  translations: PropTypes?.shape({
    prompt: PropTypes?.shape({
      newUser: PropTypes?.string?.isRequired,
      createAccount: PropTypes?.string?.isRequired,
      backToHome: PropTypes?.string?.isRequired,
      needHelp: PropTypes?.string?.isRequired
    })?.isRequired
  })?.isRequired
};