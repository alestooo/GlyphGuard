pub mod compare;
pub mod files;
pub mod findings;
pub mod inspect;
pub mod normalize;
pub mod rules;

pub const VERSION: &str = env!("CARGO_PKG_VERSION");

pub fn project_name() -> &'static str {
    "GlyphGuard"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn project_name_is_glyphguard() {
        assert_eq!(project_name(), "GlyphGuard");
    }

    #[test]
    fn version_is_not_empty() {
        assert!(!VERSION.is_empty());
    }
}
