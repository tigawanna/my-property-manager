import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";

export function useTheme() {
  const location = useLocation();
  const rootSerachParams = useSearch({
    from: "__root__",
  });
  const theme = rootSerachParams.theme;
  const navigate = useNavigate({  });
  function updateTheme(newTheme: typeof theme) {
    navigate({
        to:location.pathname,
        search:{
            theme:newTheme
        }
    });
  }
  return {
    theme,
    updateTheme
  }
}
