import { Heading, Text } from "@medusajs/ui";
import { Button } from "@/components/ui/button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Zaten bir hesabınız var mı?
        </Heading>
        <Text className="text-muted-foreground mt-2 font-medium">
          Daha iyi bir deneyim için oturum açın.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-10"
            data-testid="sign-in-button"
          >
            Giriş Yap
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
