use std::path::PathBuf;

use clap::{Parser, Subcommand};

use glyphguard_core::compare::{ComparisonDifference, compare_strings};
use glyphguard_core::files::read_text_file;
use glyphguard_core::findings::Finding;
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

    /// Compare two strings at the Unicode level.
    Compare {
        /// First string.
        left: String,

        /// Second string.
        right: String,
    },

    /// Scan a UTF-8 text file for Unicode security findings.
    ScanFile {
        /// File to scan.
        path: PathBuf,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Inspect { text } => {
            inspect(&text);
        }

        Commands::Normalize { text } => {
            print_normalization(&text);
        }

        Commands::Scan { text } => {
            scan(&text);
        }

        Commands::Compare { left, right } => {
            compare(&left, &right);
        }

        Commands::ScanFile { path } => {
            scan_file(&path);
        }
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

    print_findings(&findings);
}

fn scan_file(path: &PathBuf) {
    match read_text_file(path) {
        Ok(file) => {
            let findings = scan_text(&file.text);

            println!("GlyphGuard File Scan");
            println!();

            println!("File:");
            println!("{}", file.path.display());
            println!();

            println!("Encoding:");
            println!("UTF-8");
            println!();

            println!("UTF-8 BOM:");
            println!("{}", yes_no(file.has_utf8_bom));
            println!();

            println!("Bytes:");
            println!("{}", file.byte_length);
            println!();

            print_findings(&findings);
        }

        Err(error) => {
            eprintln!("GlyphGuard File Scan");
            eprintln!();

            eprintln!("Error:");
            eprintln!("{error}");

            std::process::exit(2);
        }
    }
}

fn print_findings(findings: &[Finding]) {
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

fn compare(left: &str, right: &str) {
    let result = compare_strings(left, right);

    println!("GlyphGuard Compare");
    println!();

    println!("Left:");
    println!("{}", result.left);
    println!();

    println!("Right:");
    println!("{}", result.right);
    println!();

    println!("Binary equal: {}", yes_no(result.binary_equal));

    println!("NFC equal: {}", yes_no(result.nfc_equal));

    println!("NFKC equal: {}", yes_no(result.nfkc_equal));

    println!(
        "Confusable skeleton equal: {}",
        yes_no(result.confusable_skeleton_equal)
    );

    println!();

    println!("Left skeleton:");
    println!("{}", result.left_skeleton);
    println!();

    println!("Right skeleton:");
    println!("{}", result.right_skeleton);
    println!();

    if result.differences.is_empty() {
        println!("No scalar differences.");
        return;
    }

    println!("Differences: {}", result.differences.len());
    println!();

    for difference in &result.differences {
        print_difference(difference);
    }
}

fn print_difference(difference: &ComparisonDifference) {
    println!("[{}]", difference.scalar_index);

    print_comparison_side(
        "Left",
        difference.left_character,
        difference.left_code_point_label(),
        difference.left_unicode_name.as_deref(),
    );

    print_comparison_side(
        "Right",
        difference.right_character,
        difference.right_code_point_label(),
        difference.right_unicode_name.as_deref(),
    );

    println!();
}

fn print_comparison_side(
    label: &str,
    character: Option<char>,
    code_point: Option<String>,
    unicode_name: Option<&str>,
) {
    match character {
        Some(character) => {
            let code_point = code_point.as_deref().unwrap_or("<unknown>");

            let unicode_name = unicode_name.unwrap_or("<no Unicode name>");

            println!("{label}: {:?}  {code_point}  {unicode_name}", character);
        }

        None => {
            println!("{label}: <missing>");
        }
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
