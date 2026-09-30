use clap::{Parser, Subcommand};
use glyphguard_core::inspect::{inspect_graphemes, inspect_scalars};
use glyphguard_core::normalize::normalize;
use glyphguard_core::rules::scan_text;

#[derive(Debug, Parser)]
#[command(name = "glyphguard")]
#[command(version)]
#[command(about = "Unicode security inspection toolkit")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Debug, Subcommand)]
enum Commands {
    /// Inspect Unicode scalar values and grapheme clusters.
    Inspect {
        /// Text to inspect.
        text: String,
    },

    /// Show Unicode normalization forms.
    Normalize {
        /// Text to normalize.
        text: String,
    },

    /// Scan text for Unicode security findings.
    Scan {
        /// Text to scan.
        text: String,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Inspect { text } => inspect(&text),
        Commands::Normalize { text } => print_normalization(&text),
        Commands::Scan { text } => scan(&text),
    }
}

fn inspect(text: &str) {
    println!("GlyphGuard Inspect");
    println!();

    println!("Input:");
    println!("{text}");
    println!();

    println!("Scalars:");

    for scalar in inspect_scalars(text) {
        let name = scalar
            .unicode_name
            .as_deref()
            .unwrap_or("<no Unicode name>");

        println!(
            "[{}] {:?}  {}  {}  bytes={}  byte_index={}",
            scalar.scalar_index,
            scalar.character,
            scalar.code_point_label(),
            name,
            scalar.utf8_hex(),
            scalar.byte_index
        );
    }

    println!();
    println!("Grapheme clusters:");

    for grapheme in inspect_graphemes(text) {
        println!(
            "[{}] {:?}  scalars={}  bytes={}  byte_index={}",
            grapheme.grapheme_index,
            grapheme.value,
            grapheme.scalar_count,
            grapheme.byte_length,
            grapheme.byte_index
        );
    }
}

fn print_normalization(text: &str) {
    let result = normalize(text);

    println!("GlyphGuard Normalize");
    println!();

    println!("Original:");
    println!("{}", result.original);
    println!("Code points: {}", code_points(&result.original));
    println!();

    println!("NFC:");
    println!("{}", result.nfc);
    println!("Code points: {}", code_points(&result.nfc));
    println!("Changed: {}", yes_no(result.nfc_changed()));
    println!();

    println!("NFD:");
    println!("{}", result.nfd);
    println!("Code points: {}", code_points(&result.nfd));
    println!("Changed: {}", yes_no(result.nfd_changed()));
    println!();

    println!("NFKC:");
    println!("{}", result.nfkc);
    println!("Code points: {}", code_points(&result.nfkc));
    println!("Changed: {}", yes_no(result.nfkc_changed()));
    println!();

    println!("NFKD:");
    println!("{}", result.nfkd);
    println!("Code points: {}", code_points(&result.nfkd));
    println!("Changed: {}", yes_no(result.nfkd_changed()));
}

fn scan(text: &str) {
    let findings = scan_text(text);

    println!("GlyphGuard Security Scan");
    println!();

    println!("Input:");
    println!("{text}");
    println!();

    if findings.is_empty() {
        println!("No findings.");
        return;
    }

    println!("Findings: {}", findings.len());
    println!();

    for finding in findings {
        println!("[{}] {}", finding.rule_id, finding.message);
        println!("Severity: {:?}", finding.severity);
        println!("Scalar index: {}", finding.scalar_index);
        println!("Byte index: {}", finding.byte_index);
        println!("Code point: {}", finding.code_point_label());

        let unicode_name = finding
            .unicode_name
            .as_deref()
            .unwrap_or("<no Unicode name>");

        println!("Unicode name: {unicode_name}");
        println!("Escaped: {}", finding.escaped_character());

        println!();
        println!("Explanation:");
        println!("{}", finding.explanation);
        println!();
    }
}

fn code_points(text: &str) -> String {
    text.chars()
        .map(|character| format!("U+{:04X}", character as u32))
        .collect::<Vec<_>>()
        .join(" ")
}

fn yes_no(value: bool) -> &'static str {
    if value { "yes" } else { "no" }
}
